import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity('ventas_detalles')
export class VentaDetalleOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @Column({ name: 'venta_id' }) ventaId: number;

  @Column({ name: 'producto_agro_id' }) productoAgroId: number;

  @Column({ name: 'lote_produccion_id' }) loteProduccionId: number;

  @Column({ name: 'cultivo_id' }) cultivoId: number;

  @Column({ name: 'cantidad_kg', type: 'decimal', precision: 12, scale: 2 })
  cantidadKg: number;

  @Column({ name: 'precio_unitario_kg', type: 'decimal', precision: 12, scale: 2 })
  precioUnitarioKg: number;

  @Column({ name: 'precio_total', type: 'decimal', precision: 12, scale: 2 })
  precioTotal: number;

  @Column({ name: 'costo_unitario_kg', type: 'decimal', precision: 12, scale: 2 })
  costoUnitarioKg: number;

  @Column({ name: 'costo_total', type: 'decimal', precision: 12, scale: 2 })
  costoTotal: number;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}