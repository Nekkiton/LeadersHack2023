import { Module } from '@nestjs/common';
import { CandidateInfoService } from './candidate-info.service';
import { CandidateInfo } from './entities/candidate-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateInfo])],
  providers: [CandidateInfoService],
  exports: [CandidateInfoService],
})
export class CandidateInfoModule {}
