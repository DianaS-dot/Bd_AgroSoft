import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { EstadoVenta } from '../../domain/entities/estado-venta.enum';

@Entity('ventas')
export class VentaOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @Column({ name: 'cliente_id' }) clienteId: number;

  @Column({ type: 'timestamp' }) fecha: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 }) subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 }) impuestos: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 }) descuento: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 }) total: number;

  @Column({ type: 'enum', enum: EstadoVenta, default: EstadoVenta.ACTIVA })
  estado: EstadoVenta;

  @Column({ name: 'usuario_id' }) usuarioId: number;

  @Column({ name: 'anulada_por_usuario_id', nullable: true }) anuladaPorUsuarioId: number;

  @Column({ name: 'fecha_anulacion', type: 'timestamp', nullable: true }) fechaAnulacion: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}