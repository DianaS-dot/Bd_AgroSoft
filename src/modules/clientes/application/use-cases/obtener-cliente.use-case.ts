import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import {
  CLIENTE_REPOSITORY,
} from '../../domain/ports/cliente.repository.port';
import type { ClienteRepositoryPort } from '../../domain/ports/cliente.repository.port';

@Injectable()
export class ObtenerClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly repo: ClienteRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<Cliente> {
    const cliente = await this.repo.buscarPorId(id);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return cliente;
  }
}