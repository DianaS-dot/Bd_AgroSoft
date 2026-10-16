import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolPermisoOrmEntity } from '../../../rol_permisos/infrastructure/persistence/rol_permiso.orm-entity.js';
import { UsuarioPermisoOrmEntity } from '../../../usuarios_permisos/infrastructure/persistence/usuario_permiso.orm-entity.js';

@Entity('permisos')
export class PermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  estado: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => RolPermisoOrmEntity, (rolPermiso) => rolPermiso.permiso)
  rolPermisos: RolPermisoOrmEntity[];

  @OneToMany(() => UsuarioPermisoOrmEntity, (usuarioPermiso) => usuarioPermiso.permiso)
  usuariosPermisos: UsuarioPermisoOrmEntity[];
}
