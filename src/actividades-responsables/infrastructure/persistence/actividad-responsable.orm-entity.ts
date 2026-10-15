import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actividades_responsables')
export class ActividadResponsableOrmEntity {
  @PrimaryGeneratedColumn()
  id_actividad_responsable!: number;

  @ManyToOne('ActividadOrmEntity', 'responsables', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: any;

  @Column()
  id_actividad!: number;

  @Column()
  id_usuario!: number;

  @Column({ nullable: true })
  rol?: string;

  @Column({ default: 'asignado' })
  estado_asignacion!: string;
}
