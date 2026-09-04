import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('iot_global_config')
export class IotGlobalConfigOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  broker!: string;

  @Column()
  port!: number;

  @Column()
  protocol!: string;

  @Column({ name: 'topic_prefix' })
  topicPrefix!: string;

  @Column({ type: 'text', name: 'default_topics' })
  defaultTopics!: string;

  @Column({ type: 'text', name: 'custom_topics' })
  customTopics!: string;

  @Column({ name: 'lote_id' })
  loteId!: number;

  @Column({ name: 'sub_lote_id' })
  subLoteId!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  activo!: boolean;

  @Column({ name: 'default_sensors_initialized', default: false })
  defaultSensorsInitialized!: boolean;

  @Column({ default: false })
  autoDiscover!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at!: Date;
}
