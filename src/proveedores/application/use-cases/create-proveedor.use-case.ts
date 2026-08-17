import { Injectable, Inject } from '@nestjs/common';
import { Proveedor } from '../../domain/entities/proveedor.entity';
import type { ProveedorRepository } from '../../domain/ports/proveedor-repository.port';
import { PROVEEDOR_REPOSITORY } from '../../domain/ports/proveedor-repository.port';

@Injectable()
export class CreateProveedorUseCase {
  constructor(
    @Inject(PROVEEDOR_REPOSITORY)
    private readonly proveedorRepository: ProveedorRepository,
  ) {}

  async execute(data: any): Promise<Proveedor> {
    const nuevoProveedor = new Proveedor(
      null,
      data.nombre,
    );
    return await this.proveedorRepository.save(nuevoProveedor);
  }
}
