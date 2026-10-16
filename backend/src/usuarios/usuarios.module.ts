
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioOrmEntity } from './infrastructure/persistence/usuario.orm-entity';
import { UsuarioTypeOrmRepository } from './infrastructure/persistence/usuario-typeorm.repository';
import { USUARIO_REPOSITORY } from './domain/ports/usuario-repository.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioOrmEntity]),
  ],
  providers: [
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioTypeOrmRepository,
    },
  ],
  exports: [USUARIO_REPOSITORY],
})
export class UsuariosModule {}
