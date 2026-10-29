import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpaTipoCultivoWikiRepository } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';
import { EpaTipoCultivoWiki } from '../../domain/entities/epa-tipo-cultivo-wiki.entity';
import { EpaTipoCultivoWikiOrmEntity } from './epa-tipo-cultivo-wiki.orm-entity';

@Injectable()
export class EpaTipoCultivoWikiTypeOrmRepository implements EpaTipoCultivoWikiRepository {
  constructor(
    @InjectRepository(EpaTipoCultivoWikiOrmEntity)
    private readonly ormRepo: Repository<EpaTipoCultivoWikiOrmEntity>,
  ) {}

  async save(relacion: EpaTipoCultivoWiki): Promise<EpaTipoCultivoWiki> {
    const saved = await this.ormRepo.save({
      epaId: relacion.epaId,
      tipoCultivoWikiId: relacion.tipoCultivoWikiId,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<EpaTipoCultivoWiki[]> {
    return (await this.ormRepo.find()).map((row) => this.toDomain(row));
  }

  async findByEpaId(epaId: number): Promise<EpaTipoCultivoWiki[]> {
    return (await this.ormRepo.findBy({ epaId })).map((row) => this.toDomain(row));
  }

  async findByTipoCultivoWikiId(tipoCultivoWikiId: number): Promise<EpaTipoCultivoWiki[]> {
    return (await this.ormRepo.findBy({ tipoCultivoWikiId })).map((row) => this.toDomain(row));
  }

  async deleteByEpaId(epaId: number): Promise<void> {
    await this.ormRepo.delete({ epaId });
  }

  private toDomain(row: EpaTipoCultivoWikiOrmEntity): EpaTipoCultivoWiki {
    return EpaTipoCultivoWiki.create({
      epaId: row.epaId,
      tipoCultivoWikiId: row.tipoCultivoWikiId,
    });
  }
}