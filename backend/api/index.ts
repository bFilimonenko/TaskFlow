import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

let app: any;

async function getApp() {
  if (!app) {
    app = await NestFactory.create(AppModule, { logger: false });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.enableCors();
    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const nestApp = await getApp();
  const server = nestApp.getHttpAdapter().getInstance();
  server(req, res);
}
