import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { RolOrmEntity } from '../../../roles/infrastructure/persistence/rol.orm-entity.js';
import { PermisoOrmEntity } from '../../../permisos/infrastructure/persistence/permiso.orm-entity.js';

@Entity('rol_permisos')
@Unique(['rolId', 'permisoId'])
export class RolPermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rolId: number;

  @ManyToOne(() => RolOrmEntity, (rol) => rol.rolPermisos)
  @JoinColumn({ name: 'rolId' })
  rol: RolOrmEntity;

  @Column()
  permisoId: number;

  @ManyToOne(() => PermisoOrmEntity, (permiso) => permiso.rolPermisos)
  @JoinColumn({ name: 'permisoId' })
  permiso: PermisoOrmEntity;

  @Column()
  estado: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
