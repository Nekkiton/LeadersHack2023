import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { UsersModule } from 'src/users/users.module';
import { ReferralsModule } from 'src/referrals/referrals.module';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';

@Module({
  imports: [UsersModule, UserProfilesModule, ReferralsModule],
  controllers: [SignUpController],
})
export class SignUpModule {}
