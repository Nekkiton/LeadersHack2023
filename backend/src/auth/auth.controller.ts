import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ResponseSignInDto } from './dto/response-sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ReferralsService } from 'src/referrals/referrals.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { User } from 'src/users/entities/user.entity';
import { EntityManager } from 'typeorm';
import { Role } from './roles/role.enum';
import { ReferralCreateUserProfileDto } from 'src/user-profiles/dto/create-user-profile.dto';
import { ResponseUserProfileDto } from 'src/user-profiles/dto/response-user-profile.dto';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { Public } from './auth.decorator';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { ResponseRegisterUserDto } from 'src/users/dto/response-register-user.dto';

@Injectable()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private userService: UsersService,
    private userProfileService: UserProfilesService,
    private referralService: ReferralsService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  private async setAccessToken(token: string, res: Response): Promise<void> {
    /**
     * TODO:
     * 1. Set domain
     * 2. secure: true
     * 3. sameSite: 'strict'
     * 4. httpOnly: true
     */
    const ttlSeconds = parseInt(this.configService.get('jwt.expiresIn'), 10);
    res.cookie('access_token', token, {
      ...(process.env.NODE_ENV === 'development'
        ? {}
        : {
            secure: true,
            sameSite: 'none', // TODO change after POC development
          }),
      expires: new Date(Date.now() + ttlSeconds * 1000),
    });
  }

  @Public()
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiOkResponse({ type: ResponseSignInDto })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  async signIn(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response) {
    let user: User;
    try {
      user = await this.userService.findOne({ email: dto.email });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
      throw error;
    }

    if (user.role === Role.NOBODY) {
      throw new UnauthorizedException();
    }
    const profile = await this.userProfileService.findOne({ user });
    if (!profile) {
      // User should complete sign-up first
      throw new UnauthorizedException();
    }
    const matched = await this.authService.compare(user, dto.password);
    if (!matched) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.signIn(user);
    await this.setAccessToken(token, res);
    return ResponseSignInDto.fromEntity(user);
  }

  @Get()
  @ApiOperation({ summary: 'Auth' })
  @ApiOkResponse()
  @ApiCookieAuth()
  async auth() {
    // handled by auth.guard
    return 'ok';
  }

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates default user' })
  @ApiCreatedResponse({ type: ResponseRegisterUserDto })
  @ApiBadRequestResponse()
  async createNobodyUser(@Body() dto: RegisterUserDto): Promise<ResponseRegisterUserDto> {
    let user: User;
    await this.entityManager.transaction(async (entityManager) => {
      const registration = await this.userService.register(dto, Role.NOBODY, { entityManager });
      user = registration.user;
      const referral = await this.referralService.createReferral(user, { entityManager });
      // TODO send invite email
      this.logger.log(
        `Generated referralId="${referral.referralId}" for user="${dto.email}"` + dto.password
          ? ''
          : ` password="${registration.password}"`,
      );
    });
    return ResponseRegisterUserDto.fromEntity(user);
  }

  @Public()
  @Post('sign-up/profile')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Completes candidate sign-up' })
  @ApiCreatedResponse({ type: ResponseUserProfileDto })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  async createUserProfile(
    @Body() dto: ReferralCreateUserProfileDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseUserProfileDto> {
    let userProfile: UserProfile;
    let user: User;
    await this.entityManager.transaction(async (entityManager) => {
      const referral = await this.referralService.findOne(dto.referralId, { entityManager });
      if (!referral) {
        throw new ForbiddenException();
      }
      userProfile = await this.userProfileService.create({ user: referral.user }, dto, { entityManager });
      user = userProfile.user;
      if (user.role === Role.NOBODY) {
        user = await this.userService.promoteToCandidate(userProfile.user, { entityManager });
      }
    });
    const token = await this.authService.signIn(user);
    await this.setAccessToken(token, res);
    return ResponseUserProfileDto.fromEntity(userProfile);
  }
}
