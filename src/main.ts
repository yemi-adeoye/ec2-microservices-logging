import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microService = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      password: process.env.REDIS_PASSWORD
    }
  })
  app.enableCors()
  await app.startAllMicroservices()
  await app.listen(8003);
}
bootstrap();
