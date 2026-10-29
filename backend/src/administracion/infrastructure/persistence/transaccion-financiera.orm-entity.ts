import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('transacciones_financieras')
export class TransaccionFinancieraOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  tipo: string;

  @Column({ type: 'varchar' })
  categoria: string;

  @Column({ type: 'double precision' })
  monto: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'integer', nullable: true })
  actividadId: number | null;

  @Column({ type: 'integer', nullable: true })
  insumoId: number | null;

  @Column({ type: 'integer', nullable: true })
  ventaId: number | null;

  @Column({ type: 'integer' })
  usuarioId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date | null;
}