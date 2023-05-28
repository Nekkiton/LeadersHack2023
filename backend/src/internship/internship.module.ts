import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internship } from './entities/internship.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Internship])],
  controllers: [InternshipController],
  providers: [InternshipService],
})
export class InternshipModule {}
