import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CultivoReal } from '../../cultivo_real/entities/cultivo_real.entity';

@Entity('cultivo_base')
export class CultivoBase {
  @PrimaryGeneratedColumn()
  id_cultivo_base!: number;

  @Column()
  nombre_cultivo!: string;

  @Column()
  tipo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ default: 'activo' })
  estado_cultivo!: string;

  // Relación: Un cultivo base puede estar en muchos cultivos reales
  @OneToMany(() => CultivoReal, (cultivoReal) => cultivoReal.cultivoBase)
  cultivosReales!: CultivoReal[];
}