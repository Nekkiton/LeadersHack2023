import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InternalController } from './_internal/_internal.controller';
import { ReferralsModule } from './referrals/referrals.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: true,
        logging: 'all',
      }),
    }),
    ReferralsModule,
    SignUpModule,
    UserProfilesModule,
  ],
  controllers: [InternalController],
})
export class AppModule {}
