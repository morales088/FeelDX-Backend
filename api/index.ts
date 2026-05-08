import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { IncomingMessage, ServerResponse } from 'http';

let server: any;

async function getServer() {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors({
      origin: process.env.ALLOWED_ORIGIN || '*',
      methods: ['GET', 'POST'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  return server;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await getServer();
  app(req, res);
}
