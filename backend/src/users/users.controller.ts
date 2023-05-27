import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { UsersService } from './users.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { ReferralsService } from 'src/referrals/referrals.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('admin')
@ApiCookieAuth()
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private usersService: UsersService,
    private referralService: ReferralsService,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Creates user' })
  @ApiCreatedResponse({ type: ResponseUserDto })
  @ApiBadRequestResponse()
  async createUser(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    let user: User;
    await this.entityManager.transaction(async (entityManager) => {
      user = await this.usersService.createUser(dto, { entityManager });
      const referral = await this.referralService.createReferral(user, { entityManager });
      // TODO send invitation email
      this.logger.log(`Generated referralId="${referral.referralId}" for user="${dto.email}"`);
    });
    return ResponseUserDto.fromEntity(user);
  }
}
