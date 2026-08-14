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

import { LoteOrmEntity } from "../../../lotes/infrastructure/persistence/lote.orm-entity";
import { OneToMany } from "typeorm";
import { CultivoOrmEntity } from "../../../cultivos/infrastructure/persistence/cultivo.orm-entity";



@Entity("sublotes")
export class SubloteOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @ManyToOne(
    () => LoteOrmEntity,
    (lote) => lote.sublotes,
)
@JoinColumn({
    name:"lote_id",
})
lote!:LoteOrmEntity;


@OneToMany(
    () => CultivoOrmEntity,
    (cultivo) => cultivo.sublote,
)
cultivos!: CultivoOrmEntity[];


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

}