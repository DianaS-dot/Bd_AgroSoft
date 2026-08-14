import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { MetodoPago } from '../../domain/entities/metodo-pago.enum';

@Entity('pagos')
export class PagoOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @Column({ name: 'venta_id' }) ventaId: number;

  @Column({ type: 'enum', enum: MetodoPago }) metodo: MetodoPago;

  @Column({ type: 'decimal', precision: 12, scale: 2 }) monto: number;

  @Column({ type: 'varchar', length: 10 }) moneda: string;

  @Column({ type: 'varchar', nullable: true }) referencia: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}