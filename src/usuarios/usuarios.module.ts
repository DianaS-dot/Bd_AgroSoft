import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUsuarioUseCase } from './application/use_cases/create-usuario.use-case';
import { GetUsuarioUseCase } from './application/use_cases/get-usuario.use-case';
import { USUARIO_REPOSITORY } from './domain/usuario-repository.port';
import { UsuarioTypeOrmRepository } from './infrastructure/persistence/usuario-typeorm.repository';
import { UsuarioOrmEntity } from './infrastructure/persistence/usuario.orm-entity';
import { UsuarioController } from './infrastructure/http/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuarioController],
  providers: [
    { provide: USUARIO_REPOSITORY, useClass: UsuarioTypeOrmRepository },
    CreateUsuarioUseCase,
    GetUsuarioUseCase,
  ],
  exports: [USUARIO_REPOSITORY, CreateUsuarioUseCase, GetUsuarioUseCase],
})
export class UsuariosModule {}
