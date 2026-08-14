import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Pago } from '../../domain/entities/pago.entity';
import { PAGO_REPOSITORY } from '../../domain/ports/pago.repository.port';
import type { PagoRepositoryPort } from '../../domain/ports/pago.repository.port';
import { CrearPagoDto } from '../../infrastructure/http/dto/crear-pago.dto';
import { VENTA_REPOSITORY } from '../../../ventas/domain/ports/venta.repository.port';
import type { VentaRepositoryPort } from '../../../ventas/domain/ports/venta.repository.port';

@Injectable()
export class CrearPagoUseCase {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly repo: PagoRepositoryPort,
    @Inject(VENTA_REPOSITORY)
    private readonly ventaRepo: VentaRepositoryPort,
  ) {}

  async ejecutar(dto: CrearPagoDto): Promise<Pago> {
    const venta = await this.ventaRepo.buscarPorId(dto.ventaId);
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }
    if (!venta.estaActiva()) {
      throw new BadRequestException('No se pueden registrar pagos sobre una venta anulada');
    }

    const totalPagado = await this.repo.sumarPagosPorVenta(dto.ventaId);
    const saldoPendiente = venta.total - totalPagado;

    if (dto.monto > saldoPendiente) {
      throw new BadRequestException(
        `El monto excede el saldo pendiente de la venta. Saldo pendiente: ${saldoPendiente.toFixed(2)}`,
      );
    }

    const pago = new Pago(null, dto.ventaId, dto.metodo, dto.monto, dto.moneda, dto.referencia ?? null);
    return this.repo.crear(pago);
  }
}