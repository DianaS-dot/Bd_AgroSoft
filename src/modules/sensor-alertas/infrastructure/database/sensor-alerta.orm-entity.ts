import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('sensor_alertas')
export class SensorAlertaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'sensor_id' })
  sensorId!: number;

  @Column('double precision')
  valor!: number;

  @Column('double precision')
  umbral!: number;

  @Column({ length: 10 })
  tipo!: string;

  @Column({ name: 'fecha_alerta', type: 'timestamp' })
  fechaAlerta!: Date;

  @Column({ name: 'lote_id' })
  loteId!: number;

  @Column({ name: 'sub_lote_id' })
  subLoteId!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at!: Date;
}
