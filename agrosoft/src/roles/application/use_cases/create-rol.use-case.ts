import { Inject, Injectable } from '@nestjs/common';
import { CreateRolInput, Rol } from '../../domain/entities/rol.entity';
import {
  ROL_REPOSITORY,
  type RolRepository,
} from '../../domain/ports/rol-repository.port';
import { RolAlreadyExistsError } from '../../domain/errors/rol-already-exists.error';

@Injectable()
export class CreateRolUseCase {
  constructor(
    @Inject(ROL_REPOSITORY)
    private readonly rolRepository: RolRepository,
  ) {}

  async execute(input: CreateRolInput): Promise<Rol> {
    // Valida las reglas de negocio (nombre y descripción obligatorios).
    const rol = Rol.create(input);

    // Unicidad del nombre del rol — regla de negocio.
    const rolExistente = await this.rolRepository.findByNombre(rol.nombre);
    if (rolExistente) {
      throw new RolAlreadyExistsError(
        `Ya existe un rol con el nombre ${rol.nombre}`,
      );
    }

    return this.rolRepository.save(rol);
  }
}
