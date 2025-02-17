import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.PORT ?? 3000;
  await app.listen(appPort);

  const logger = new Logger();

  logger.log(`Nest Application started on http://localhost:${appPort}`);
}

bootstrap();
