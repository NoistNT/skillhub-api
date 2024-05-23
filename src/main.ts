import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (!PORT) throw new Error('PORT is not defined');

  await app.listen(PORT);
}
bootstrap();
