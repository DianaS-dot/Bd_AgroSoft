import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity('sensor_lecturas')
export class SensorLecturaOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'sensor_id' })
  sensorId!: number;

  @Column()
  valor!: string;

  @Column({ name: 'fecha_ectura', type: 'timestamptz' })
  fechaLectura!: Date;

  @Column()
  unidad!: string;

  @Column({ nullable: true })
  observaciones!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at!: Date;

}
