import './config/aliases';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

import expressListRoutes from 'express-list-routes';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  // Helmet helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());

  // Allow validation by using decorators from the 'class-validator' package in our DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      // Ensure that only acceptable properties (defined in DTOs) are passed on to method handlers
      whitelist: true,

      // Automatically transform payloads to be objects typed according to their DTO classes
      transform: true,
    }),
  );

  await app.listen(port);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, 'API:', router));
}
bootstrap();
