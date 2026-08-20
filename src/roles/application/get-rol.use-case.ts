import { Inject, Injectable } from '@nestjs/common';
import { Rol } from '../domain/rol.entity';
import {
  ROL_REPOSITORY,
  type RolRepository,
} from '../domain/rol-repository.port';
import { RolNotFoundError } from '../domain/errors/rol-not-found.error';

@Injectable()
export class GetRolUseCase {
  constructor(
    @Inject(ROL_REPOSITORY)
    private readonly rolRepository: RolRepository,
  ) {}

  async findById(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findById(id);
    if (!rol) {
      throw new RolNotFoundError(`No se encontró un rol con id ${id}`);
    }
    return rol;
  }

  async findByNombre(nombre: string): Promise<Rol> {
    const rol = await this.rolRepository.findByNombre(nombre?.trim());
    if (!rol) {
      throw new RolNotFoundError(`No se encontró un rol con nombre ${nombre}`);
    }
    return rol;
  }
}
