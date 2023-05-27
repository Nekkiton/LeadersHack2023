import { Module } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { UserProfile } from './entities/user-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfilesService],
  exports: [UserProfilesService],
})
export class UserProfilesModule {}
