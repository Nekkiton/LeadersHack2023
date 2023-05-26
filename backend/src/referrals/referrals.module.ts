import { Module } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Referral } from './entities/referral.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Referral])],
  providers: [ReferralsService],
  exports: [ReferralsService],
})
export class ReferralsModule {}
