import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/global.excpetion-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.PORT ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('Weather API description')
    .setVersion('0.0.1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(appPort);

  const logger = new Logger();

  logger.log(`Nest Application started on http://localhost:${appPort}`);
}

bootstrap();
