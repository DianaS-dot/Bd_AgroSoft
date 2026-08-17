import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaOrmEntity } from '../../../categorias/infrastructure/persistence/categoria.orm-entity';
import { AlmacenOrmEntity } from '../../../almacenes/infrastructure/persistence/almacen.orm-entity';
import { ProveedorOrmEntity } from '../../../proveedores/infrastructure/persistence/proveedor.orm-entity';
import { ReservaOrmEntity } from '../../../reserva/infrastructure/persistence/reserva.orm-entity';
import { ActividadInsumoUsoOrmEntity } from '../../../actividades_insumos_uso/infrastructure/persistence/actividad-insumo-uso.orm-entity';

@Entity('insumos') // Nombre de la tabla en la base de datos [9]
export class InsumoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('double precision', { default: 0 })
  stockUso: number;

  @Column('varchar')
  unidadUso: string;

  // En Postgres, los tipos numeric se manejan como string en JS para no perder precisión [6, 8]
  @Column('numeric', { precision: 10, scale: 2 })
  costoUnitario: string;

  @Column('varchar') // Representa el enum insumos_estado_enum del diagrama
  estado: string;

  // Relaciones
  @Column({ nullable: true })
  categoriaId: number;

  @Column({ nullable: true })
  almacenId: number;

  @Column({ nullable: true })
  proveedorId: number;

  @ManyToOne(() => CategoriaOrmEntity)
  @JoinColumn({ name: 'categoriaId' })
  categoria: CategoriaOrmEntity;

  @ManyToOne(() => AlmacenOrmEntity)
  @JoinColumn({ name: 'almacenId' })
  almacen: AlmacenOrmEntity;

  @ManyToOne(() => ProveedorOrmEntity)
  @JoinColumn({ name: 'proveedorId' })
  proveedor: ProveedorOrmEntity;

  @OneToMany(() => ReservaOrmEntity, reserva => reserva.insumo)
  reservasActividades: ReservaOrmEntity[];

  @OneToMany(() => ActividadInsumoUsoOrmEntity, uso => uso.insumo)
  usosActividades: ActividadInsumoUsoOrmEntity[];

  // Auditoría (Campos presentes en todas tus tablas) [7, 10]
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
