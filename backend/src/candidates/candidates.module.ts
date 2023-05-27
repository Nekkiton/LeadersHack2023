import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidateInfoModule } from 'src/candidate-info/candidate-info.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CandidateInfoModule, UsersModule],
  controllers: [CandidatesController],
})
export class CandidatesModule {}
