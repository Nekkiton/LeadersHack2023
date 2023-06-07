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
import { UpdateUserProfileDto } from 'src/user-profiles/dto/update-user-profile.dto';
import { ResponseUserProfileShortDto } from 'src/user-profiles/dto/response-user-profile-short.dto';

@Controller('users')
@ApiTags('users')
@ApiCookieAuth()
export class UsersController {
  constructor(private usersService: UsersService, private userProfilesService: UserProfilesService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({ type: ResponseUserProfileDto })
  @ApiNotFoundResponse()
  async getUserProfile(@Req() req): Promise<ResponseUserProfileDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.userProfilesService.findOne({ user });
    if (!profile) {
      throw new NotFoundException('User profile have not created yet. Completed sign-up');
    }
    return ResponseUserProfileDto.fromEntity(profile);
  }

  @Get('profile-short')
  @ApiOperation({ summary: 'Get current user profile short' })
  @ApiOkResponse({ type: ResponseUserProfileShortDto })
  @ApiNotFoundResponse()
  async getUserProfileShort(@Req() req): Promise<ResponseUserProfileShortDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.userProfilesService.findOne({ user });
    if (!profile) {
      throw new NotFoundException('User profile have not created yet. Completed sign-up');
    }
    return {
      ...ResponseUserProfileShortDto.fromEntityPartial(profile),
      rating: 4.8, // TODO compute when rating is available
    };
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Partially updates current user profile' })
  @ApiOkResponse({ type: ResponseUserProfileDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async patchUserProfile(@Body() dto: UpdateUserProfileDto, @Req() req): Promise<ResponseUserProfileDto> {
    const payload: UserPayload = req.user;
    const user = await this.usersService.findOne({ email: payload.email });
    const profile = await this.userProfilesService.update({ user }, dto);
    return ResponseUserProfileDto.fromEntity(profile);
  }
}
