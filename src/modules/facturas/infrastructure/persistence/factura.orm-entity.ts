import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('facturas')
export class FacturaOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Index()
  @Column({ name: 'venta_id' }) ventaId: number;

  @Column({ unique: true }) numero: string;

  @Column({ type: 'varchar', nullable: true }) prefijo: string;

  @Column({ name: 'fecha_emision', type: 'timestamp' }) fechaEmision: Date;

  @Column({ type: 'timestamp', nullable: true }) vencimiento: Date;

  @Column({ name: 'qr_url', type: 'text', nullable: true }) qrUrl: string;

  @Column({ name: 'pdf_url', type: 'text', nullable: true }) pdfUrl: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) deletedAt: Date;
}