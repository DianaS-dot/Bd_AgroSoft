import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SubloteRepository } from "../../domain/ports/sublote.repository";
import { Sublote } from "../../domain/entities/sublote";
import { SubloteOrmEntity } from "../database/sublote.orm-entity";

@Injectable()
export class SublotePostgresRepository implements SubloteRepository {

  constructor(
    @InjectRepository(SubloteOrmEntity)
    private readonly repository: Repository<SubloteOrmEntity>,
  ) {}

  async crear(sublote: Sublote): Promise<Sublote> {

    const entity = this.repository.create({

      nombre: sublote.nombre,

      lote: {
        id: sublote.loteId,
      },

      geom: sublote.geom,
      areaM2: sublote.areaM2,
      areaHa: sublote.areaHa,
      centroide: sublote.centroide,
      descripcion: sublote.descripcion,
      estado: sublote.estado,

    });

    const resultado = await this.repository.save(entity);

    return new Sublote({

      id: resultado.id,
      nombre: resultado.nombre,
      loteId: resultado.lote.id,
      geom: resultado.geom,
      areaM2: resultado.areaM2,
      areaHa: resultado.areaHa,
      centroide: resultado.centroide,
      descripcion: resultado.descripcion,
      estado: resultado.estado,

    });

  }

  async obtenerTodos(): Promise<Sublote[]> {

    const sublotes = await this.repository.find({

      relations: {
        lote: true,
      },

    });

    return sublotes.map((s) =>
      new Sublote({

        id: s.id,
        nombre: s.nombre,
        loteId: s.lote.id,
        geom: s.geom,
        areaM2: s.areaM2,
        areaHa: s.areaHa,
        centroide: s.centroide,
        descripcion: s.descripcion,
        estado: s.estado,

      }),
    );

  }

  async obtenerPorId(id: number): Promise<Sublote | null> {

    const sublote = await this.repository.findOne({

      where: { id },

      relations: {
        lote: true,
      },

    });

    if (!sublote) {
      return null;
    }

    return new Sublote({

      id: sublote.id,
      nombre: sublote.nombre,
      loteId: sublote.lote.id,
      geom: sublote.geom,
      areaM2: sublote.areaM2,
      areaHa: sublote.areaHa,
      centroide: sublote.centroide,
      descripcion: sublote.descripcion,
      estado: sublote.estado,

    });

  }

  async actualizar(sublote: Sublote): Promise<Sublote> {

    await this.repository.save({

      id: sublote.id,

      nombre: sublote.nombre,

      lote: {
        id: sublote.loteId,
      },

      geom: sublote.geom,
      areaM2: sublote.areaM2,
      areaHa: sublote.areaHa,
      centroide: sublote.centroide,
      descripcion: sublote.descripcion,
      estado: sublote.estado,

    });

    return (await this.obtenerPorId(sublote.id!))!;

  }

  async eliminar(id: number): Promise<void> {

    await this.repository.delete(id);

  }

}