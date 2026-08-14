import { Inject, Injectable } from '@nestjs/common';
import { Venta } from '../../domain/entities/venta.entity';
import { EstadoVenta } from '../../domain/entities/estado-venta.enum';
import { VENTA_REPOSITORY } from '../../domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../domain/ports/venta.repository.port';
import { CrearVentaDto } from '../dto/crear-venta.dto';

@Injectable()
export class CrearVentaUseCase {
  constructor(
    @Inject(VENTA_REPOSITORY)
    private readonly repo: VentaRepositoryPort,
  ) {}

  async ejecutar(dto: CrearVentaDto): Promise<Venta> {
    const subtotal = dto.subtotal ?? 0;
    const impuestos = dto.impuestos ?? 0;
    const descuento = dto.descuento ?? 0;

    const venta = new Venta(
      null,
      dto.clienteId,
      new Date(dto.fecha),
      subtotal,
      impuestos,
      descuento,
      subtotal + impuestos - descuento,
      EstadoVenta.ACTIVA,
      dto.usuarioId,
      null,
      null,
    );
    return this.repo.crear(venta);
  }
}