import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { InsumoOrmEntity } from '../../../insumos/infrastructure/persistence/insumo.orm-entity';

@Entity('almacenes')
export class AlmacenOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  nombre: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  ubicacion: string;

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

  @OneToMany(
    () => InsumoOrmEntity,
    (insumo) => insumo.almacen,
  )
  insumos: InsumoOrmEntity[];
}
