import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioOrmEntity } from './infrastructure/persistence/usuario.orm-entity.js';
import { RolOrmEntity } from '../roles/infrastructure/persistence/rol.orm-entity.js';

import { UsuarioController } from './infrastructure/http/controllers/usuario.controller.js';

import { CreateUsuarioUseCase } from './application/use_cases/create-usuario.use-case.js';
import { GetUsuarioUseCase } from './application/use_cases/get-usuario.use-case.js';

import { UsuarioRepositoryImpl } from './infrastructure/persistence/usuario.repository.js';

import {
  USUARIO_REPOSITORY,
} from './domain/ports/usuario-repository.port.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioOrmEntity,
      RolOrmEntity,
    ]),
  ],

  controllers: [
    UsuarioController,
  ],

  providers: [
    CreateUsuarioUseCase,
    GetUsuarioUseCase,

    // Conecta el puerto con la implementación
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioRepositoryImpl,
    },
  ],

  exports: [
    CreateUsuarioUseCase,
    GetUsuarioUseCase,

    // MUY IMPORTANTE:
    // permite que AuthModule use USUARIO_REPOSITORY
    USUARIO_REPOSITORY,
  ],
})
export class UsuariosModule {}