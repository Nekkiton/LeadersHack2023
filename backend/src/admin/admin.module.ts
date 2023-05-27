import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { ReferralsModule } from 'src/referrals/referrals.module';

@Module({
  imports: [UsersModule, ReferralsModule],
  controllers: [AdminController],
})
export class AdminModule {}
