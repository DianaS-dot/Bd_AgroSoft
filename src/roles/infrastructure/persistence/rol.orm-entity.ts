import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/persistence/usuario.orm-entity.js';
import { RolPermisoOrmEntity } from '../../../rol_permisos/infrastructure/persistence/rol_permiso.orm-entity.js';

@Entity('roles')
export class RolOrmEntity {
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

  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.rol)
  usuarios: UsuarioOrmEntity[];

  @OneToMany(() => RolPermisoOrmEntity, (rolPermiso) => rolPermiso.rol)
  rolPermisos: RolPermisoOrmEntity[];
}
