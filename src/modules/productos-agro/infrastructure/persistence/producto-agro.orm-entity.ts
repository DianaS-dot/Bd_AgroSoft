import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos_agro')
export class ProductoAgroOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true }) nombre: string;

  @Column({ name: 'unidad_base' }) unidadBase: string;

  @Column({ type: 'text', nullable: true }) descripcion: string;

  @Column({ type: 'text', nullable: true }) imagen: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) deletedAt: Date;
}