import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';

@Entity('actividades_herramientas')
export class ActividadHerramienta {
  @PrimaryGeneratedColumn()
  id_actividad_herramienta!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.herramientas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: Actividad;

  @Column()
  id_actividad!: number;

  @Column()
  nombre_herramienta!: string;

  @Column({ type: 'int', default: 1 })
  cantidad!: number;

  @Column({ nullable: true })
  unidad_medida?: string;

  @Column({ nullable: true })
  estado_uso?: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
