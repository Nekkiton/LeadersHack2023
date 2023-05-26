import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InternalController } from './_internal/_internal.controller';
import { CreateUserTable1685050336357 } from './migrations/1685050336357-CreateUserTable';
import { StubUsers1685095732654 } from './migrations/1685095732654-StubUsers';

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
        migrationsRun: true,
        migrations: [CreateUserTable1685050336357, StubUsers1685095732654],
        logging: 'all',
      }),
    }),
  ],
  controllers: [InternalController],
})
export class AppModule {}
