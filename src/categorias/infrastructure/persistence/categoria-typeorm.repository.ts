import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaRepository } from '../../domain/ports/categoria-repository.port';
import { Categoria } from '../../domain/entities/categoria.entity';
import { CategoriaOrmEntity } from './categoria.orm-entity';

@Injectable()
export class CategoriaTypeOrmRepository implements CategoriaRepository {
  constructor(
    @InjectRepository(CategoriaOrmEntity)
    private readonly repository: Repository<CategoriaOrmEntity>,
  ) {}

  async save(categoria: Categoria): Promise<Categoria> {
    const ormEntity = this.repository.create({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      tipoInsumo: categoria.tipoInsumo,
    });

    const savedEntity = await this.repository.save(ormEntity);
    return new Categoria(
      savedEntity.id,
      savedEntity.nombre,
      savedEntity.descripcion,
      savedEntity.tipoInsumo,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
    );
  }

  async findAll(): Promise<Categoria[]> {
    const entities = await this.repository.find();
    return entities.map(entity => new Categoria(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.tipoInsumo,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ));
  }

  async findById(id: number): Promise<Categoria | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? new Categoria(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.tipoInsumo,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    ) : null;
  }

  async update(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    await this.repository.update(id, {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      tipoInsumo: categoria.tipoInsumo,
    });

    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error('Categoria no encontrada');
    }
    return new Categoria(
      entity.id,
      entity.nombre,
      entity.descripcion,
      entity.tipoInsumo,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
