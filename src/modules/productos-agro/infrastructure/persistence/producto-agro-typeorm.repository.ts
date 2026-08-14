import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ProductoAgroRepositoryPort } from '../../domain/ports/producto-agro.repository.port';
import { ProductoAgro } from '../../domain/entities/producto-agro.entity';
import { ProductoAgroOrmEntity } from './producto-agro.orm-entity';

export class ProductoAgroTypeOrmRepository implements ProductoAgroRepositoryPort {
  constructor(
    @InjectRepository(ProductoAgroOrmEntity)
    private readonly ormRepo: Repository<ProductoAgroOrmEntity>,
  ) {}

  private toDomain(e: ProductoAgroOrmEntity): ProductoAgro {
    return new ProductoAgro(e.id, e.nombre, e.unidadBase, e.descripcion, e.imagen, e.createdAt);
  }

  async crear(producto: ProductoAgro): Promise<ProductoAgro> {
    const entity = this.ormRepo.create({
      nombre: producto.nombre,
      unidadBase: producto.unidadBase,
      descripcion: producto.descripcion ?? undefined,
      imagen: producto.imagen ?? undefined,
    });
    const saved = await this.ormRepo.save(entity);
    return this.toDomain(saved);
  }

  async actualizar(id: number, producto: ProductoAgro): Promise<ProductoAgro> {
    await this.ormRepo.update(id, {
      nombre: producto.nombre,
      unidadBase: producto.unidadBase,
      descripcion: producto.descripcion ?? undefined,
      imagen: producto.imagen ?? undefined,
    });
    const actualizado = await this.ormRepo.findOneBy({ id });
    if (!actualizado) {
      throw new Error('Producto agro no encontrado después de actualizar');
    }
    return this.toDomain(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.ormRepo.softDelete(id);
  }

  async buscarPorId(id: number): Promise<ProductoAgro | null> {
    const e = await this.ormRepo.findOneBy({ id });
    return e ? this.toDomain(e) : null;
  }

  async buscarPorNombre(nombre: string): Promise<ProductoAgro | null> {
    const e = await this.ormRepo.findOneBy({ nombre });
    return e ? this.toDomain(e) : null;
  }

  async listar(): Promise<ProductoAgro[]> {
    const list = await this.ormRepo.find();
    return list.map((e) => this.toDomain(e));
  }
}