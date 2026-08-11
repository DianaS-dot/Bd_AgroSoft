import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActividadResponsable } from '../../actividades_responsables/entities/actividad_responsable.entity';
import { ActividadEvidencia } from '../../actividades_evidencias/entities/actividad_evidencia.entity';
import { ActividadServicio } from '../../actividades_servicios/entities/actividad_servicio.entity';
import { ActividadHerramienta } from '../../actividades_herramientas/entities/actividad_herramienta.entity';
import { ActividadHistorial } from '../../actividad_historial/entities/actividad_historial.entity';

@Entity('actividades')
export class Actividad {
  @PrimaryGeneratedColumn()
  id_actividad!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column()
  tipo_actividad!: string;

  @Column({ default: 'pendiente' })
  estado!: string;

  @Column({ default: 'media' })
  prioridad!: string;

  @Column({ type: 'date', nullable: true })
  fecha_programada?: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio?: string;

  @Column({ type: 'date', nullable: true })
  fecha_fin?: string;

  @Column({ nullable: true })
  id_cultivo_real?: number;

  @CreateDateColumn()
  fecha_creacion!: Date;

  @UpdateDateColumn()
  fecha_actualizacion!: Date;

  @OneToMany(() => ActividadResponsable, (responsable) => responsable.actividad)
  responsables!: ActividadResponsable[];

  @OneToMany(() => ActividadEvidencia, (evidencia) => evidencia.actividad)
  evidencias!: ActividadEvidencia[];

  @OneToMany(() => ActividadServicio, (servicio) => servicio.actividad)
  servicios!: ActividadServicio[];

  @OneToMany(() => ActividadHerramienta, (herramienta) => herramienta.actividad)
  herramientas!: ActividadHerramienta[];

  @OneToMany(() => ActividadHistorial, (historial) => historial.actividad)
  historial!: ActividadHistorial[];
}
