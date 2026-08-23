import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolOrmEntity } from '../../../roles/infrastructure/persistence/rol.orm-entity.js';
import { UsuarioPermisoOrmEntity } from '../../../usuarios_permisos/infrastructure/persistence/usuario_permiso.orm-entity.js';
import { EmailCodeOrmEntity } from '../../../email_codes/infrastructure/persistence/email-code.orm-entity.js';

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  identificacion: string;

  @Column({ type: 'varchar', nullable: true })
  idFicha: string | null;

  @Column()
  programaFormacionId: number;

  @Column({ type: 'varchar', nullable: true })
  telefono: string | null;

  @Column({ unique: true })
  correo: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date | null;

  @Column()
  estado: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date | null;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl: string | null;

  @Column()
  rolId: number;

  @ManyToOne(() => RolOrmEntity, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rolId' })
  rol: RolOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => UsuarioPermisoOrmEntity, (usuarioPermiso) => usuarioPermiso.usuario)
  usuariosPermisos: UsuarioPermisoOrmEntity[];

  @OneToMany(() => EmailCodeOrmEntity, (emailCode) => emailCode.usuario)
  emailCodes: EmailCodeOrmEntity[];
}
