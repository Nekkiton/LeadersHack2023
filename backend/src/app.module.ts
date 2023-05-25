import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { InternalController } from './_internal/_internal.controller';

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
      useFactory: (configService: ConfigService) => {
        console.log(`TEST TEST: ${configService.get('database.host')}`);
        console.log(`TEST TEST: ${configService.get('database.port')}`);
        console.log(`TEST TEST: ${configService.get('database.username')}`);
        console.log(`TEST TEST: ${configService.get('database.password')}`);
        console.log(`TEST TEST: ${configService.get('database.database')}`);
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          autoLoadEntities: true,
          logging: 'all',
        };
      },
    }),
  ],
  controllers: [InternalController],
})
export class AppModule {}
