import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/persistence/usuario.orm-entity.js';

@Entity('email_codes')
export class EmailCodeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.emailCodes)
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioOrmEntity;

  @Column({ name: 'code', type: 'varchar', length: 6 })
  codigo: string;

  @Column({ type: 'varchar', length: 10 })
  tipo: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  usedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
