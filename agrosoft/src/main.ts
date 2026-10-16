import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1');

  // Activa la validación automática de todos los DTOs que usen class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Elimina propiedades no decoradas en el DTO
      forbidNonWhitelisted: true, // Lanza error si llegan propiedades extra
      transform: true,       // Convierte los tipos automáticamente (string → number, etc.)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
