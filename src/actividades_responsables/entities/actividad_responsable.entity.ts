import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';

@Entity('actividades_responsables')
export class ActividadResponsable {
  @PrimaryGeneratedColumn()
  id_actividad_responsable!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.responsables, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: Actividad;

  @Column()
  id_actividad!: number;

  @Column()
  id_usuario!: number;

  @Column({ nullable: true })
  rol?: string;

  @Column({ default: 'asignado' })
  estado_asignacion!: string;
}
