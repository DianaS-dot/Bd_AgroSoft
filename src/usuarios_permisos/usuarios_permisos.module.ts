import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUsuarioPermisoUseCase } from './application/create-usuario_permiso.use-case';
import { USUARIO_PERMISO_REPOSITORY } from './domain/usuario_permiso-repository.port';
import { UsuarioPermisoTypeOrmRepository } from './infrastructure/persistence/usuario_permiso-typeorm.repository';
import { UsuarioPermisoOrmEntity } from './infrastructure/persistence/usuario_permiso.orm-entity';
import { UsuarioPermisoController } from './infrastructure/http/usuario_permiso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPermisoOrmEntity])],
  controllers: [UsuarioPermisoController],
  providers: [
    {
      provide: USUARIO_PERMISO_REPOSITORY,
      useClass: UsuarioPermisoTypeOrmRepository,
    },
    CreateUsuarioPermisoUseCase,
  ],
  exports: [USUARIO_PERMISO_REPOSITORY, CreateUsuarioPermisoUseCase],
})
export class UsuariosPermisosModule {}
