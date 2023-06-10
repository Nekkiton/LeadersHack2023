import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidateInfoModule } from 'src/candidate-info/candidate-info.module';
import { UsersModule } from 'src/users/users.module';
import { InternshipModule } from 'src/internship/internship.module';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { ApplicationModule } from 'src/application/application.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, InternshipModule, CandidateInfoModule, UserProfilesModule, ApplicationModule, ConfigModule],
  controllers: [CandidatesController],
})
export class CandidatesModule {}
