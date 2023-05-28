import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InternalController } from './_internal/_internal.controller';
import { ReferralsModule } from './referrals/referrals.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { RolesGuard } from './auth/roles/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { ProfileModule } from './profile/profile.module';
import { CandidatesModule } from './candidates/candidates.module';
import { CandidateInfoModule } from './candidate-info/candidate-info.module';
import { InternshipModule } from './internship/internship.module';
import { IsAfterDateConstraint } from './validation/isAfterDate.validator';

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
    UserProfilesModule,
    ProfileModule,
    CandidatesModule,
    CandidateInfoModule,
    InternshipModule,
  ],
  controllers: [InternalController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
    IsAfterDateConstraint,
  ],
})
export class AppModule {}
