import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const VERSION = configService.get('VERSION', '1');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(`api`);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  const documentConfigV1 = new DocumentBuilder()
    .setTitle('Api Gestion de Empresas')
    .setDescription('API para la gestion de empresas y sus transferencias.')
    .setVersion(VERSION)
    .build();

  const documentV1 = SwaggerModule.createDocument(app, documentConfigV1);
  SwaggerModule.setup(`api/docs/v${VERSION}`, app, documentV1);

  app.use(helmet());
  app.enableCors();
  const APP_PORT = Number(configService.get('APP_PORT', 3000));
  await app.listen(APP_PORT);
  console.log(
    `Application is running on: localhost:${APP_PORT}/api/v${VERSION}`,
  );
  console.log(
    `Swagger is running on: localhost:${APP_PORT}/api/docs/v${VERSION}`,
  );
}
bootstrap();
