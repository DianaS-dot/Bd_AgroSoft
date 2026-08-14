import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Factura } from '../../domain/entities/factura.entity';
import { FACTURA_REPOSITORY } from '../../domain/ports/factura.repository.port';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';
import { ActualizarFacturaDto } from '../../infrastructure/http/dto/actualizar-factura.dto';

@Injectable()
export class ActualizarFacturaUseCase {
  constructor(
    @Inject(FACTURA_REPOSITORY)
    private readonly repo: FacturaRepositoryPort,
  ) {}

  async ejecutar(id: number, dto: ActualizarFacturaDto): Promise<Factura> {
    const factura = await this.repo.buscarPorId(id);
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    if (dto.numero) factura.numero = dto.numero;
    if (dto.prefijo !== undefined) factura.prefijo = dto.prefijo;
    if (dto.fechaEmision) factura.fechaEmision = new Date(dto.fechaEmision);
    if (dto.vencimiento !== undefined) {
      factura.vencimiento = dto.vencimiento ? new Date(dto.vencimiento) : null;
    }
    if (dto.qrUrl !== undefined || dto.pdfUrl !== undefined) {
      factura.asignarArchivos(
        dto.qrUrl ?? factura.qrUrl,
        dto.pdfUrl ?? factura.pdfUrl,
      );
    }

    return this.repo.actualizar(id, factura);
  }
}