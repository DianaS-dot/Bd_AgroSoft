import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('epas')
export class EpaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  tipoEpa: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'text', nullable: true })
  sintomas: string | null;

  @Column({ type: 'text', nullable: true })
  manejoYControl: string | null;

  @Column('integer', { array: true, nullable: true })
  mesesProbables: number[];

  @Column('text', { array: true, nullable: true })
  temporadas: string[];

  @Column({ type: 'text', nullable: true })
  notasEstacionalidad: string | null;

  @Column('text', { array: true, nullable: true })
  fotosSintomas: string[];

  @Column('text', { array: true, nullable: true })
  fotosGenerales: string[];

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'integer' })
  creadoPorUsuarioId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date | null;
}