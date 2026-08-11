import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';

@Entity('actividad_historial')
export class ActividadHistorial {
  @PrimaryGeneratedColumn()
  id_actividad_historial!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.historial, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: Actividad;

  @Column()
  id_actividad!: number;

  @Column()
  accion!: string;

  @Column({ nullable: true })
  estado_anterior?: string;

  @Column({ nullable: true })
  estado_nuevo?: string;

  @Column()
  id_usuario!: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn()
  fecha_registro!: Date;
}
