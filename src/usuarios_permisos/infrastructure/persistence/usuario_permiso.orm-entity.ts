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
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/persistence/usuario.orm-entity.js';
import { PermisoOrmEntity } from '../../../permisos/infrastructure/persistence/permiso.orm-entity.js';

@Entity('usuarios_permisos')
@Unique(['usuarioId', 'permisoId'])
export class UsuarioPermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.usuariosPermisos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioOrmEntity;

  @Column()
  permisoId: number;

  @ManyToOne(() => PermisoOrmEntity, (permiso) => permiso.usuariosPermisos)
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
