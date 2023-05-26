import { Module } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { UserProfile } from './entities/user-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralsModule } from 'src/referrals/referrals.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile]), ReferralsModule],
  providers: [UserProfilesService],
  exports: [UserProfilesService],
})
export class UserProfilesModule {}
