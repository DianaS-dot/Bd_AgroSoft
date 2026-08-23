import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePermisoUseCase } from './application/use_cases/create-permiso.use-case';
import { GetPermisoUseCase } from './application/use_cases/get-permiso.use-case';
import { PERMISO_REPOSITORY } from './domain/ports/permiso-repository.port';
import { PermisoTypeOrmRepository } from './infrastructure/persistence/permiso-typeorm.repository';
import { PermisoOrmEntity } from './infrastructure/persistence/permiso.orm-entity';
import { PermisoController } from './infrastructure/http/controllers/permiso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermisoOrmEntity])],
  controllers: [PermisoController],
  providers: [
    { provide: PERMISO_REPOSITORY, useClass: PermisoTypeOrmRepository },
    CreatePermisoUseCase,
    GetPermisoUseCase,
  ],
  exports: [PERMISO_REPOSITORY, CreatePermisoUseCase, GetPermisoUseCase],
})
export class PermisosModule {}
