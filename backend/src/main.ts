import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });

  await app.listen(port);
  console.log(`HTTP Server running on http://localhost:${port}`);
}

bootstrap();