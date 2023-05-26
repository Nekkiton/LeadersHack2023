import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { CreateNobodyUserDto } from './dto/create-nobody-user.dto';
import { ResponseNobodyUserDto } from './dto/response-nobody-user.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/auth/roles/role.enum';
import { ReferralsService } from 'src/referrals/referrals.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { CreateUserProfileDto } from 'src/user-profiles/dto/create-user-profile.dto';
import { ResponseUserProfileDto } from 'src/user-profiles/dto/response-user-profile.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Controller('sign-up')
export class SignUpController {
  private readonly logger = new Logger(SignUpController.name);

  constructor(
    private userService: UsersService,
    private userProfileService: UserProfilesService,
    private referralService: ReferralsService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async createNobodyUser(@Body() dto: CreateNobodyUserDto): Promise<ResponseNobodyUserDto> {
    let user: User;
    await this.entityManager.transaction(async (entityManager) => {
      user = await this.userService.createUser(
        {
          email: dto.email,
          password: dto.password,
          role: Role.NOBODY,
        },
        { entityManager },
      );
      const referral = await this.referralService.createReferral(user, { entityManager });
      // TODO send invite email
      this.logger.log(`Generated referralId="${referral.referralId}" for user="${dto.email}"`);
    });
    return ResponseNobodyUserDto.fromEntity(user);
  }

  @Post('user-profiles')
  @HttpCode(HttpStatus.CREATED)
  async createUserProfile(@Body() dto: CreateUserProfileDto): Promise<ResponseUserProfileDto> {
    let userProfile: UserProfile;
    await this.entityManager.transaction(async (entityManager) => {
      userProfile = await this.userProfileService.createUserProfile(dto, { entityManager });
      await this.userService.promoteToCandidate(userProfile.user, { entityManager });
    });
    return ResponseUserProfileDto.fromEntity(userProfile);
  }
}
