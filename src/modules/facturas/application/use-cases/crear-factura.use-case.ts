import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { Factura } from '../../domain/entities/factura.entity';
import { FACTURA_REPOSITORY } from '../../domain/ports/factura.repository.port';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';
import { CrearFacturaDto } from '../dto/crear-factura.dto';

@Injectable()
export class CrearFacturaUseCase {
  constructor(
    @Inject(FACTURA_REPOSITORY)
    private readonly repo: FacturaRepositoryPort,
  ) {}

  async ejecutar(dto: CrearFacturaDto): Promise<Factura> {
    const existente = await this.repo.buscarPorVentaId(dto.ventaId);
    if (existente) {
      throw new ConflictException('Esta venta ya tiene una factura emitida');
    }

    const numeroDuplicado = await this.repo.buscarPorNumero(dto.numero);
    if (numeroDuplicado) {
      throw new ConflictException('Ya existe una factura con ese número');
    }

    const factura = new Factura(
      null,
      dto.ventaId,
      dto.numero,
      dto.prefijo ?? null,
      new Date(dto.fechaEmision),
      dto.vencimiento ? new Date(dto.vencimiento) : null,
      dto.qrUrl ?? null,
      dto.pdfUrl ?? null,
    );
    return this.repo.crear(factura);
  }
}