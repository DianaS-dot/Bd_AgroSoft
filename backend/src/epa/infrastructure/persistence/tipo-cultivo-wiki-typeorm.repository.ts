import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoCultivoWikiRepository } from '../../domain/ports/tipo-cultivo-wiki.repository.port';
import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';
import { TipoCultivoWikiOrmEntity } from './tipo-cultivo-wiki.orm-entity';

@Injectable()
export class TipoCultivoWikiTypeOrmRepository implements TipoCultivoWikiRepository {
  constructor(
    @InjectRepository(TipoCultivoWikiOrmEntity)
    private readonly ormRepo: Repository<TipoCultivoWikiOrmEntity>,
  ) {}

  async save(tipoCultivoWiki: TipoCultivoWiki): Promise<TipoCultivoWiki> {
    const saved = await this.ormRepo.save({
      id: tipoCultivoWiki.id ?? undefined,
      nombre: tipoCultivoWiki.nombre,
      descripcion: tipoCultivoWiki.descripcion,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<TipoCultivoWiki[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findById(id: number): Promise<TipoCultivoWiki | null> {
    const row = await this.ormRepo.findOneBy({ id });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: TipoCultivoWikiOrmEntity): TipoCultivoWiki {
    return TipoCultivoWiki.create({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    });
  }
}