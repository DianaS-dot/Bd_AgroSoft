import { Injectable, Inject } from '@nestjs/common';
import { Proveedor } from '../../domain/entities/proveedor.entity';
import type { ProveedorRepository } from '../../domain/ports/proveedor-repository.port';
import { PROVEEDOR_REPOSITORY } from '../../domain/ports/proveedor-repository.port';

@Injectable()
export class GetProveedorUseCase {
  constructor(
    @Inject(PROVEEDOR_REPOSITORY)
    private readonly proveedorRepository: ProveedorRepository,
  ) {}

  async execute(id: number): Promise<Proveedor | null> {
    return await this.proveedorRepository.findById(id);
  }

  async executeAll(): Promise<Proveedor[]> {
    return await this.proveedorRepository.findAll();
  }
}
