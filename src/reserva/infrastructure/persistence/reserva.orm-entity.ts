import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// import { ActividadOrmEntity } from '../../actividades/infrastructure/persistence/actividad.orm-entity';
import { InsumoOrmEntity } from '../../../insumos/infrastructure/persistence/insumo.orm-entity';

@Entity('actividades_insumos_reserva')
export class ReservaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actividadId: number;

  @Column()
  insumoId: number;

  @Column({
    type: 'double precision',
  })
  cantidadReservada: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  // @ManyToOne(
  //   () => ActividadOrmEntity,
  //   (actividad) => actividad.reservasInsumos,
  // )
  // @JoinColumn({
  //   name: 'actividadId',
  // })
  // actividad: ActividadOrmEntity;

  @ManyToOne(
    () => InsumoOrmEntity,
    (insumo) => insumo.reservasActividades,
  )
  @JoinColumn({
    name: 'insumoId',
  })
  insumo: InsumoOrmEntity;
}
