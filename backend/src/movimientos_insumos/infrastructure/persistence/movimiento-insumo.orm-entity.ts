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

import { InsumoOrmEntity } from '../../../insumos/infrastructure/persistence/insumo.orm-entity';
// import { ActividadOrmEntity } from '../../actividades/infrastructure/persistence/actividad.orm-entity';
// import { UsuarioOrmEntity } from '../../usuarios/infrastructure/persistence/usuario.orm-entity';
import { AlmacenOrmEntity } from '../../../almacenes/infrastructure/persistence/almacen.orm-entity';

// TODO: Definir este enum según los tipos de movimiento del negocio
// enum MovimientoInsumoTipoEnum {
//   ENTRADA = 'entrada',
//   SALIDA = 'salida',
//   TRANSFERENCIA = 'transferencia',
//   AJUSTE = 'ajuste',
// }

@Entity('movimientos_insumos')
export class MovimientoInsumoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  insumoId: number;

  @Column({
    type: 'enum',
    // enum: MovimientoInsumoTipoEnum,
    enum: ['entrada', 'salida', 'transferencia', 'ajuste'], // Temporal hasta definir el enum
  })
  tipo: string; // MovimientoInsumoTipoEnum;

  @Column('double precision')
  cantidadPresentacion: number;

  @Column('double precision')
  cantidadUso: number;

  @Column('double precision')
  costoUnitarioPresentacion: number;

  @Column('double precision')
  costoUnitarioUso: number;

  @Column('double precision')
  costoTotal: number;

  @Column('double precision')
  valorInventarioResultante: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  actividadId: number | null;

  @Column()
  usuarioId: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  almacenOrigenId: number | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  almacenDestinoId: number | null;

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

  @ManyToOne(() => InsumoOrmEntity)
  @JoinColumn({ name: 'insumoId' })
  insumo: InsumoOrmEntity;

  // @ManyToOne(() => ActividadOrmEntity)
  // @JoinColumn({ name: 'actividadId' })
  // actividad: ActividadOrmEntity;

  // @ManyToOne(() => UsuarioOrmEntity)
  // @JoinColumn({ name: 'usuarioId' })
  // usuario: UsuarioOrmEntity;

  @ManyToOne(() => AlmacenOrmEntity)
  @JoinColumn({ name: 'almacenOrigenId' })
  almacenOrigen: AlmacenOrmEntity;

  @ManyToOne(() => AlmacenOrmEntity)
  @JoinColumn({ name: 'almacenDestinoId' })
  almacenDestino: AlmacenOrmEntity;
}
