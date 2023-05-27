import { Body, Controller, Get, NotFoundException, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseUserProfileDto } from 'src/user-profiles/dto/response-user-profile.dto';
import { UserPayload } from 'src/auth/auth.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { User } from './entities/user.entity';
import { UpdateUserProfileDto } from 'src/user-profiles/dto/update-user-profile.dto';

@Controller('users')
@ApiTags('users')
@ApiCookieAuth()
export class UsersController {
  constructor(private usersService: UsersService, private userProfilesService: UserProfilesService) {}

  private async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('No user found. Are you signed-up?');
    }
    return user;
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ type: ResponseUserProfileDto })
  @ApiNotFoundResponse()
  async getUserProfile(@Req() req): Promise<ResponseUserProfileDto> {
    const payload: UserPayload = req.user;
    const user = await this.getUserByEmail(payload.email);
    const profile = await this.userProfilesService.findOne(user);
    if (!profile) {
      throw new NotFoundException('User profile have not created yet. Completed sign-up');
    }
    return ResponseUserProfileDto.fromEntity(profile);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Partially updates current user profile' })
  @ApiOkResponse({ type: ResponseUserProfileDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async patchUserProfile(@Body() dto: UpdateUserProfileDto, @Req() req): Promise<ResponseUserProfileDto> {
    const payload: UserPayload = req.user;
    const user = await this.getUserByEmail(payload.email);
    const profile = await this.userProfilesService.updateUserProfile(user, dto);
    return ResponseUserProfileDto.fromEntity(profile);
  }
}
