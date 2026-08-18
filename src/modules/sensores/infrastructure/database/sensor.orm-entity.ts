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

@Entity('sensores')
export class SensorOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'nombre_sensor' })
  nombreSensor!: string;

  @Column({ name: 'tipo_sensor_id' })
  tipoSensorId!: number;

  @Column()
  protocolo!: string;

  @Column({ name: 'endpoint_url' })
  endpointUrl!: string;

  @Column({ name: 'mqtt_topic' })
  mqttTopic!: string;

  @Column('double precision', { name: 'valor_minimo_sensor' })
  valorMinimoSensor!: number;

  @Column('double precision', { name: 'valor_maximo_sensor' })
  valorMaximoSensor!: number;

  @Column({ default: true })
  activo!: boolean;

  @Column({ name: 'estado_conexion' })
  estadoConexion!: string;

  @Column({ type: 'text' })
  estado!: string;

  @Column({ name: 'ultimo_valor' })
  ultimoValor!: string;

  @Column({ name: 'ultima_medicion', type: 'timestamp', nullable: true })
  ultimaMedicion!: Date;

  @Column({ name: 'last_seen_at', type: 'timestamp', nullable: true })
  lastSeenAt!: Date;

  @Column({ name: 'cultivoId', nullable: true })
  cultivoId!: number;

  @Column({ name: 'creadoPorUsuarioId', nullable: true })
  creadoPorUsuarioId!: number;

  @Column({ name: 'global_config_id', nullable: true })
  globalConfigId!: number;

  @Column({ name: 'lote_id', nullable: true })
  loteId!: number;

  @Column({ name: 'sub_lote_id', nullable: true })
  subLoteId!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at!: Date;

}
