import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  app.use('/uploads', serveStatic(join(__dirname, '..', 'uploads')));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
  await app.listen(3000);
  console.log(`HTTP Server running on http://localhost:3000`);
}
bootstrap();