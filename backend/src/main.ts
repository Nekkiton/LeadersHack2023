import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('GeekBattle Project')
    .setDescription('GeekBattle Project API description')
    .setVersion('1.0')
    .addTag('LeadersHack2023')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // whitelist strip additional properties from DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();
