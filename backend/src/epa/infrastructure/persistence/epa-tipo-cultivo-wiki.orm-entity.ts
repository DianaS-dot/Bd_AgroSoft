import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EpaOrmEntity } from './epa.orm-entity';
import { TipoCultivoWikiOrmEntity } from './tipo-cultivo-wiki.orm-entity';

@Entity('epa_tipos_cultivos_wiki')
export class EpaTipoCultivoWikiOrmEntity {
  @PrimaryColumn({ type: 'integer' })
  epaId: number;

  @PrimaryColumn({ type: 'integer' })
  tipoCultivoWikiId: number;

  @ManyToOne(() => EpaOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'epaId' })
  epa: EpaOrmEntity;

  @ManyToOne(() => TipoCultivoWikiOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tipoCultivoWikiId' })
  tipoCultivoWiki: TipoCultivoWikiOrmEntity;
}