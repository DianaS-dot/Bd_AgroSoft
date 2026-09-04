import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsuariosModule } from '../usuarios/usuarios.module.js';

import { AuthController } from './infrastructure/http/controllers/auth.controller.js';
import { LoginUseCase } from './application/use-cases/login.use-case.js';

@Module({
  imports: [
    UsuariosModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'agrosoft_secret',

      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    LoginUseCase,
  ],
})
export class AuthModule {}