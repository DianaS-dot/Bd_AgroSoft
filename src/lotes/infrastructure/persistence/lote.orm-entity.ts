import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";

import { SubloteOrmEntity } from "../../../sublotes/infrastructure/persistence/sublote.orm-entity";

@Entity("lotes")
export class LoteOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  geom!: string;

  @Column("double precision")
  areaM2!: number;

  @Column("double precision")
  areaHa!: number;

  @Column()
  centroide!: string;

  @Column()
  descripcion!: string;

  @Column()
  estado!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(
    () => SubloteOrmEntity,
    (sublote) => sublote.lote,
  )
  sublotes!: SubloteOrmEntity[];

}