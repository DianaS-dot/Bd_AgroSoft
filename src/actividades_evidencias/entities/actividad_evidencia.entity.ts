import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';

@Entity('actividades_evidencias')
export class ActividadEvidencia {
  @PrimaryGeneratedColumn()
  id_actividad_evidencia!: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.evidencias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: Actividad;

  @Column()
  id_actividad!: number;

  @Column()
  tipo_evidencia!: string;

  @Column()
  archivo_url!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  observaciones?: string;

  @CreateDateColumn()
  fecha_registro!: Date;
}
