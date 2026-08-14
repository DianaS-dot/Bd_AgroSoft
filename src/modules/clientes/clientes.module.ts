import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteOrmEntity } from './infrastructure/persistence/cliente.orm-entity';
import { ClienteTypeOrmRepository } from './infrastructure/persistence/cliente-typeorm.repository';
import { CLIENTE_REPOSITORY } from './domain/ports/cliente.repository.port';
import { ClienteController } from './infrastructure/http/controllers/cliente.controller';
import { CrearClienteUseCase } from './application/use-cases/crear-cliente.use-case';
import { ListarClientesUseCase } from './application/use-cases/listar-clientes.use-case';
import { ObtenerClienteUseCase } from './application/use-cases/obtener-cliente.use-case';
import { ActualizarClienteUseCase } from './application/use-cases/actualizar-cliente.use-case';
import { EliminarClienteUseCase } from './application/use-cases/eliminar-cliente.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteOrmEntity])],
  controllers: [ClienteController],
  providers: [
    { provide: CLIENTE_REPOSITORY, useClass: ClienteTypeOrmRepository },
    CrearClienteUseCase,
    ListarClientesUseCase,
    ObtenerClienteUseCase,
    ActualizarClienteUseCase,
    EliminarClienteUseCase,
  ],
  exports: [CLIENTE_REPOSITORY],
})
export class ClientesModule {}
