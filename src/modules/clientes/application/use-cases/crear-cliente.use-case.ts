import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import {
  CLIENTE_REPOSITORY,
} from '../../domain/ports/cliente.repository.port';
import type { ClienteRepositoryPort } from '../../domain/ports/cliente.repository.port';
import { CrearClienteDto } from '../dto/crear-cliente.dto';

@Injectable()
export class CrearClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly repo: ClienteRepositoryPort,
  ) {}

  async ejecutar(dto: CrearClienteDto): Promise<Cliente> {
    const existente = await this.repo.buscarPorIdentificacion(dto.identificacion);
    if (existente) {
      throw new ConflictException('Ya existe un cliente con esa identificación');
    }

    const cliente = new Cliente(
      null,
      dto.nombre,
      dto.identificacion,
      dto.telefono ?? null,
      dto.email ?? null,
      dto.direccion ?? null,
      dto.notas ?? null,
    );
    return this.repo.crear(cliente);
  }
}