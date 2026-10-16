import { Injectable, Inject } from '@nestjs/common';
import { Almacen } from '../../domain/entities/almacen.entity';
import type { AlmacenRepository } from '../../domain/ports/almacen-repository.port';
import { ALMACEN_REPOSITORY } from '../../domain/ports/almacen-repository.port';

@Injectable()
export class GetAlmacenUseCase {
  constructor(
    @Inject(ALMACEN_REPOSITORY)
    private readonly almacenRepository: AlmacenRepository,
  ) {}

  async execute(id: number): Promise<Almacen | null> {
    return await this.almacenRepository.findById(id);
  }

  async executeAll(): Promise<Almacen[]> {
    return await this.almacenRepository.findAll();
  }
}
