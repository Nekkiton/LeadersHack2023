import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, UserProfilesModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
