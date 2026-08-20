import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rol_permisos')
@Unique(['rolId', 'permisoId'])
export class RolPermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rolId: number;

  @Column()
  permisoId: number;

  @Column()
  estado: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
