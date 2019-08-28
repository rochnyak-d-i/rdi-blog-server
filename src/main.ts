import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const {host, port} = configService.get('server');

  app.disable('x-powered-by');
  // app.set('etag', false);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    // transform: true,
    // transformOptions: {
    //   enableImplicitConversion: true
    // },
    validationError: {
      target: false,
      value: false
    }
  }));

  await app.listen(port, host);

  Logger.log(`Starting in: ${host}:${port}`);
}

bootstrap().catch(error => Logger.error(error.message, error.stack));
