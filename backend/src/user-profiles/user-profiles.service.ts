import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { CUService } from 'src/utils/CUService';

@Injectable()
export class UserProfilesService extends CUService<UserProfile, 'user', CreateUserProfileDto, UpdateUserProfileDto> {
  constructor(
    @InjectRepository(UserProfile)
    userProfileRepository: Repository<UserProfile>,
  ) {
    super(UserProfile, userProfileRepository, {
      entityName: 'User Profile',
      identityKeys: ['user'],
      relations: { user: true },
    });
  }
}
