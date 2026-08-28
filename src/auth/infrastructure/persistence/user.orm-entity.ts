import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolOrmEntity } from './rol.orm-entity';

@Entity('usuario')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id_usuario: number;

  @Column({ name: 'id_rol' })
  id_rol: number;

  @Column({ name: 'id_cultivo_real', nullable: true, type: 'integer' })
  id_cultivo_real: number | null;

  @Column('varchar')
  nombre: string;

  @Column('varchar', { unique: true })
  correo_usuario: string;

  @Column('varchar')
  contrasena_hash: string;

  @Column('boolean', { default: true })
  estado: boolean;

  @Column('varchar', { nullable: true })
  telefono: string | null;

  @ManyToOne(() => RolOrmEntity)
  @JoinColumn({ name: 'id_rol' })
  rol: RolOrmEntity;
}