import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import {
  CLIENTE_REPOSITORY,
} from '../../domain/ports/cliente.repository.port';
import type { ClienteRepositoryPort } from '../../domain/ports/cliente.repository.port';

@Injectable()
export class ListarClientesUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly repo: ClienteRepositoryPort,
  ) {}

  async ejecutar(): Promise<Cliente[]> {
    return this.repo.listar();
  }
}