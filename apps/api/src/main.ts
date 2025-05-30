/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // enable all levels
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new GraphQLExceptionFilter());
  await app.listen(port);
  Logger.log(
    `Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
