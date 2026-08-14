import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CLIENTE_REPOSITORY,
} from '../../domain/ports/cliente.repository.port';
import type { ClienteRepositoryPort } from '../../domain/ports/cliente.repository.port';

@Injectable()
export class EliminarClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly repo: ClienteRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const cliente = await this.repo.buscarPorId(id);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    await this.repo.eliminar(id);
  }
}