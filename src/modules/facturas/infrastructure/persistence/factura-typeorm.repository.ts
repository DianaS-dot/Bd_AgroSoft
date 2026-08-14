import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { FacturaRepositoryPort } from '../../domain/ports/factura.repository.port';
import { Factura } from '../../domain/entities/factura.entity';
import { FacturaOrmEntity } from './factura.orm-entity';

export class FacturaTypeOrmRepository implements FacturaRepositoryPort {
  constructor(
    @InjectRepository(FacturaOrmEntity)
    private readonly ormRepo: Repository<FacturaOrmEntity>,
  ) {}

  private toDomain(e: FacturaOrmEntity): Factura {
    return new Factura(
      e.id,
      e.ventaId,
      e.numero,
      e.prefijo,
      e.fechaEmision,
      e.vencimiento,
      e.qrUrl,
      e.pdfUrl,
      e.createdAt,
    );
  }

  async crear(factura: Factura): Promise<Factura> {
    const entity = this.ormRepo.create({
      ventaId: factura.ventaId,
      numero: factura.numero,
      prefijo: factura.prefijo ?? undefined,
      fechaEmision: factura.fechaEmision,
      vencimiento: factura.vencimiento ?? undefined,
      qrUrl: factura.qrUrl ?? undefined,
      pdfUrl: factura.pdfUrl ?? undefined,
    });
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async actualizar(id: number, factura: Factura): Promise<Factura> {
    await this.ormRepo.update(id, {
      numero: factura.numero,
      prefijo: factura.prefijo ?? undefined,
      fechaEmision: factura.fechaEmision,
      vencimiento: factura.vencimiento ?? undefined,
      qrUrl: factura.qrUrl ?? undefined,
      pdfUrl: factura.pdfUrl ?? undefined,
    });
    const actualizado = await this.ormRepo.findOneBy({ id });
    if (!actualizado) {
      throw new Error('Factura no encontrada después de actualizar');
    }
    return this.toDomain(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.ormRepo.softDelete(id);
  }

  async buscarPorId(id: number): Promise<Factura | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async buscarPorVentaId(ventaId: number): Promise<Factura | null> {
    const e = await this.ormRepo.findOneBy({ ventaId });
    return e ? this.toDomain(e) : null;
  }

  async buscarPorNumero(numero: string): Promise<Factura | null> {
    const e = await this.ormRepo.findOneBy({ numero });
    return e ? this.toDomain(e) : null;
  }

  async listar(): Promise<Factura[]> {
    const list = await this.ormRepo.find();
    return list.map((e) => this.toDomain(e));
  }
}