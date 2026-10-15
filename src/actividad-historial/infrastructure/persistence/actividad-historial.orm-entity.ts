import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actividad_historial')
export class ActividadHistorialOrmEntity {
  @PrimaryGeneratedColumn()
  id_actividad_historial!: number;

  @ManyToOne('ActividadOrmEntity', 'historial', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_actividad' })
  actividad!: any;

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
