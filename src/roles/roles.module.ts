import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRolUseCase } from './application/use_cases/create-rol.use-case';
import { GetRolUseCase } from './application/use_cases/get-rol.use-case';
import { ROL_REPOSITORY } from './domain/rol-repository.port';
import { RolTypeOrmRepository } from './infrastructure/persistence/rol-typeorm.repository';
import { RolOrmEntity } from './infrastructure/persistence/rol.orm-entity';
import { RolController } from './infrastructure/http/rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolOrmEntity])],
  controllers: [RolController],
  providers: [
    { provide: ROL_REPOSITORY, useClass: RolTypeOrmRepository },
    CreateRolUseCase,
    GetRolUseCase,
  ],
  exports: [ROL_REPOSITORY, CreateRolUseCase, GetRolUseCase],
})
export class RolesModule {}
