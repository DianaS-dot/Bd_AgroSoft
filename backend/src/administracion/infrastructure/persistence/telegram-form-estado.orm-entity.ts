import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('telegram_form_estado')
export class TelegramFormEstadoOrmEntity {
  @Column({ type: 'bigint', comment: 'ID del usuario de Telegram (único)' })
  user_id: string; // bigint llega como string desde pg-driver

  @Column({ type: 'integer', comment: 'Paso actual en el formulario' })
  step: number;

  @Column({ type: 'jsonb', comment: 'Datos del formulario en formato JSON' })
  data: Record<string, any>;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'Estado del formulario (activo, logged_in, etc.)',
  })
  estado: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: 'Fecha y hora de última actualización',
  })
  updated_at: Date;

  @Column({ type: 'text', nullable: true, comment: 'Token de acceso para autenticación' })
  access_token: string | null;

  @PrimaryGeneratedColumn({ comment: 'Identificador único autoincremental' })
  id: number;
}