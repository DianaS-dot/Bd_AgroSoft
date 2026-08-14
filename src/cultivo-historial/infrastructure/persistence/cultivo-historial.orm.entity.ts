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

import { CultivoOrmEntity } from "../../../cultivos/infrastructure/persistence/cultivo.orm-entity";

@Entity("cultivo_historial")
export class CultivoHistorialOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => CultivoOrmEntity,
    (cultivo) => cultivo.historiales,
  )
  @JoinColumn({
    name: "cultivo_id",
  })
  cultivo!: CultivoOrmEntity;

  @Column({
    name: "usuario_id",
  })
  usuarioId!: number;

  @Column()
  motivo!: string;

  @Column()
  cambios!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

}