import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { InsumoOrmEntity } from '../../../insumos/infrastructure/persistence/insumo.orm-entity';

@Entity('categorias')
export class CategoriaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  tipoInsumo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => InsumoOrmEntity, insumo => insumo.categoria)
  insumos: InsumoOrmEntity[];
}
