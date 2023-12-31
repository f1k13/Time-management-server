import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
  console.log(`Server start on port ${PORT}`);
}
start();
