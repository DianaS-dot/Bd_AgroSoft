import { Inject, Injectable } from '@nestjs/common';
import { Factura } from '../../domain/entities/factura.entity';
import { FACTURA_REPOSITORY } from '../../domain/ports/factura.repository.port';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';

@Injectable()
export class ListarFacturasUseCase {
  constructor(
    @Inject(FACTURA_REPOSITORY)
    private readonly repo: FacturaRepositoryPort,
  ) {}

  async ejecutar(): Promise<Factura[]> {
    return this.repo.listar();
  }
}