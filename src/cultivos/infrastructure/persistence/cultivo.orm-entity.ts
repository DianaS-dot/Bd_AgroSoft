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

import { SubloteOrmEntity } from "../../../sublotes/infrastructure/persistence/sublote.orm-entity";
import { OneToMany } from "typeorm";
import { CultivoHistorialOrmEntity } from "../../../cultivo-historial/infrastructure/persistence/cultivo-historial.orm.entity";
@Entity('cultivos')
export class CultivoOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombreCultivo!: string;

  @Column()
  tipoCultivo!: string;

  @Column()
  descripcion!: string;

  @Column({name:'lote_id'})
  loteId!: number;

@ManyToOne(
    () => SubloteOrmEntity,
    (sublote) => sublote.cultivos,
)
@JoinColumn({
    name: "sublote_id",
})
sublote!: SubloteOrmEntity;


@OneToMany(
    () => CultivoHistorialOrmEntity,
    (historial) => historial.cultivo,
)
historiales!: CultivoHistorialOrmEntity[];

  @Column({name:'img_cultivo'})
  imgCultivo!: string;

  @Column({ type: 'date' })
  fechaSiembra!: Date;

  @Column({ type: 'date' })
  fechaFinalizacion!: Date;

  @Column('double precision')
  costoTotal!: number;

  @Column()
  estado!: string;


  
  @CreateDateColumn({name:'created_at'})
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion!: Date;

}

// el ! le dice que esta prpiedad si sera inicializada