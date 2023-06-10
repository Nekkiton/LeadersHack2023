import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), ConfigModule],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
