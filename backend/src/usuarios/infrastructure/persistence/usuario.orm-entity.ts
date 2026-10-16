
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  apellido: string;

  @Column('varchar')
  identificacion: string;

  @Column('varchar')
  idFicha: string;

  @Column('integer')
  programaFormacionId: number;

  @Column('varchar')
  telefono: string;

  @Column('varchar')
  correo: string;

  @Column('varchar')
  passwordHash: string;

  @Column('timestamp', { nullable: true })
  emailVerifiedAt: Date | null;

  @Column('varchar')
  estado: string;

  @Column('timestamp', { nullable: true })
  lastLoginAt: Date | null;

  @Column('varchar', { nullable: true })
  avatarUrl: string | null;

  @Column('integer')
  rolId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
