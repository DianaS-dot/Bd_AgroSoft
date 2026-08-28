import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rol')
export class RolOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id_rol: number;

  @Column('varchar', { length: 255, unique: true })
  nombre_rol: string;
}