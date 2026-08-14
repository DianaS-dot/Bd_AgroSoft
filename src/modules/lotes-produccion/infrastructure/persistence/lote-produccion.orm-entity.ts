import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('lotes_produccion')
export class LoteProduccionOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @Column({ name: 'producto_agro_id' }) productoAgroId: number;

  @Index()
  @Column({ name: 'cultivo_id' }) cultivoId: number;

  @Column({ name: 'lote_id' }) loteId: number;

  @Column({ name: 'sub_lote_id', nullable: true }) subLoteId: number;

  @Column({ name: 'actividad_cosecha_id', nullable: true }) actividadCosechaId: number;

  @Column({ type: 'varchar', nullable: true }) calidad: string;

  @Column({ name: 'cantidad_kg', type: 'decimal', precision: 12, scale: 2 })
  cantidadKg: number;

  @Column({ name: 'stock_disponible_kg', type: 'decimal', precision: 12, scale: 2 })
  stockDisponibleKg: number;

  @Column({ name: 'costo_unitario_kg', type: 'decimal', precision: 12, scale: 2 })
  costoUnitarioKg: number;

  @Column({ name: 'costo_total', type: 'decimal', precision: 12, scale: 2 })
  costoTotal: number;

  @Column({ name: 'precio_sugerido_kg', type: 'decimal', precision: 12, scale: 2, nullable: true })
  precioSugeridoKg: number;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) deletedAt: Date;
}