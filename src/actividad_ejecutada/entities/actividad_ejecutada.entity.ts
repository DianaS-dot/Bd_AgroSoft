import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actividad_ejecutada')
export class ActividadEjecutada {
  @PrimaryGeneratedColumn()
  id_actividad_ejecutada: number;

  @Column()
  id_cultivo_real: number;

  @Column()
  id_cultivo: number;

  @Column({ type: 'date' })
  fecha_ejecucion: Date;

  @Column()
  id_usuario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad_usada: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_aplicado: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}