import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = 8080
    await app.listen(port);
    Logger.log(`Application Running on port ${port}`)
}

bootstrap();