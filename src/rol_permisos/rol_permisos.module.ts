import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRolPermisoUseCase } from './application/use_cases/create-rol_permiso.use-case';
import { GetRolPermisoUseCase } from './application/use_cases/get-rol_permiso.use-case';
import { ROL_PERMISO_REPOSITORY } from './domain/rol_permiso-repository.port';
import { RolPermisoTypeOrmRepository } from './infrastructure/persistence/rol_permiso-typeorm.repository';
import { RolPermisoOrmEntity } from './infrastructure/persistence/rol_permiso.orm-entity';
import { RolPermisoController } from './infrastructure/http/rol_permiso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolPermisoOrmEntity])],
  controllers: [RolPermisoController],
  providers: [
    { provide: ROL_PERMISO_REPOSITORY, useClass: RolPermisoTypeOrmRepository },
    CreateRolPermisoUseCase,
    GetRolPermisoUseCase,
  ],
  exports: [
    ROL_PERMISO_REPOSITORY,
    CreateRolPermisoUseCase,
    GetRolPermisoUseCase,
  ],
})
export class RolPermisosModule {}
