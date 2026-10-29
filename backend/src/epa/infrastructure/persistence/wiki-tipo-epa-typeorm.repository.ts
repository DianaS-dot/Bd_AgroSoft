import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WikiTipoEpaRepository } from '../../domain/ports/wiki-tipo-epa.repository.port';
import { WikiTipoEpa } from '../../domain/entities/wiki-tipo-epa.entity';
import { WikiTipoEpaOrmEntity } from './wiki-tipo-epa.orm-entity';

@Injectable()
export class WikiTipoEpaTypeOrmRepository implements WikiTipoEpaRepository {
  constructor(
    @InjectRepository(WikiTipoEpaOrmEntity)
    private readonly ormRepo: Repository<WikiTipoEpaOrmEntity>,
  ) {}

  async save(wikiTipoEpa: WikiTipoEpa): Promise<WikiTipoEpa> {
    const saved = await this.ormRepo.save({
      id: wikiTipoEpa.id ?? undefined,
      nombre: wikiTipoEpa.nombre,
      descripcion: wikiTipoEpa.descripcion,
      tipoEpaEnum: wikiTipoEpa.tipoEpaEnum,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<WikiTipoEpa[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<WikiTipoEpa | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: WikiTipoEpaOrmEntity): WikiTipoEpa {
    return WikiTipoEpa.create({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      tipoEpaEnum: row.tipoEpaEnum,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}