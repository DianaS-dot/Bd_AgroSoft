import { Injectable, Inject } from '@nestjs/common';
import { Almacen } from '../../domain/entities/almacen.entity';
import type { AlmacenRepository } from '../../domain/ports/almacen-repository.port';
import { ALMACEN_REPOSITORY } from '../../domain/ports/almacen-repository.port';

@Injectable()
export class CreateAlmacenUseCase {
  constructor(
    @Inject(ALMACEN_REPOSITORY)
    private readonly almacenRepository: AlmacenRepository,
  ) {}

  async execute(data: any): Promise<Almacen> {
    const nuevoAlmacen = new Almacen(
      null,
      data.nombre,
      data.descripcion,
      data.ubicacion,
    );
    return await this.almacenRepository.save(nuevoAlmacen);
  }
}
