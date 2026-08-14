import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { TipoMovimiento } from '../../domain/entities/tipo-movimiento.enum';

@Entity('movimientos_produccion')
export class MovimientoProduccionOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @Column({ name: 'lote_produccion_id' }) loteProduccionId: number;

  @Column({ type: 'enum', enum: TipoMovimiento }) tipo: TipoMovimiento;

  @Column({ name: 'cantidad_kg', type: 'decimal', precision: 12, scale: 2 })
  cantidadKg: number;

  @Column({ name: 'costo_unitario_kg', type: 'decimal', precision: 12, scale: 2 })
  costoUnitarioKg: number;

  @Column({ name: 'costo_total', type: 'decimal', precision: 12, scale: 2 })
  costoTotal: number;

  @Index()
  @Column({ name: 'venta_id', nullable: true }) ventaId: number;

  @Column({ type: 'text', nullable: true }) descripcion: string;

  @Column({ name: 'usuario_id' }) usuarioId: number;

  @Column({ type: 'timestamp' }) fecha: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}