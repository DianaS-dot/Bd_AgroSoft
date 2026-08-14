import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class ClienteOrmEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;

  @Column({ unique: true }) identificacion: string;

  @Column({ type: 'varchar', nullable: true }) telefono: string;

  @Column({ type: 'varchar', nullable: true }) email: string;

  @Column({ type: 'text', nullable: true }) direccion: string;

  @Column({ type: 'text', nullable: true }) notas: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) deletedAt: Date;
}