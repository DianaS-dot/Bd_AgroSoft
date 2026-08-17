import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsumoRepository } from '../../domain/ports/insumo-repository.port';
import { Insumo } from '../../domain/entities/insumo.entity';
import { InsumoOrmEntity } from './insumo.orm-entity';

@Injectable()
export class InsumoTypeOrmRepository implements InsumoRepository {
  constructor(
    @InjectRepository(InsumoOrmEntity)
    private readonly repository: Repository<InsumoOrmEntity>,
  ) {}

  private toDomain(entity: InsumoOrmEntity): Insumo {
    return Insumo.create({
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      stockUso: entity.stockUso,
      unidadUso: entity.unidadUso,
      costoUnitario: parseFloat(entity.costoUnitario),
      estado: entity.estado,
      categoriaId: entity.categoriaId,
      almacenId: entity.almacenId,
      proveedorId: entity.proveedorId,
    });
  }

  async save(insumo: Insumo): Promise<Insumo> {
    const ormEntity = this.repository.create({
      nombre: insumo.nombre,
      descripcion: insumo.descripcion,
      stockUso: insumo.stockUso,
      unidadUso: insumo.unidadUso,
      costoUnitario: insumo.costoUnitario.toString(),
      estado: insumo.estado,
      categoriaId: insumo.categoriaId,
      almacenId: insumo.almacenId,
      proveedorId: insumo.proveedorId,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<Insumo[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findById(id: number): Promise<Insumo | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, insumo: Partial<Insumo>): Promise<Insumo> {
    await this.repository.update(id, {
      nombre: insumo.nombre,
      descripcion: insumo.descripcion,
      stockUso: insumo.stockUso,
      unidadUso: insumo.unidadUso,
      costoUnitario: insumo.costoUnitario?.toString(),
      estado: insumo.estado,
      categoriaId: insumo.categoriaId,
      almacenId: insumo.almacenId,
      proveedorId: insumo.proveedorId,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Insumo no encontrado');
    }
    return this.toDomain(entity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
