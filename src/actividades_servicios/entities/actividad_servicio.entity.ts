import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';

@Entity('actividades_servicios')
export class ActividadServicio {
  @PrimaryGeneratedColumn()
  id_actividad_servicio!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.servicios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: Actividad;

  @Column()
  id_actividad!: number;

  @Column()
  nombre_servicio!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costo!: number;

  @Column({ nullable: true })
  proveedor?: string;
}
