import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import {
  CLIENTE_REPOSITORY,
} from '../../domain/ports/cliente.repository.port';
import type { ClienteRepositoryPort } from '../../domain/ports/cliente.repository.port';
import { ActualizarClienteDto } from '../dto/actualizar-cliente.dto';

@Injectable()
export class ActualizarClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly repo: ClienteRepositoryPort,
  ) {}

  async ejecutar(id: number, dto: ActualizarClienteDto): Promise<Cliente> {
    const cliente = await this.repo.buscarPorId(id);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    cliente.actualizar(dto);
    return this.repo.actualizar(id, cliente);
  }
}