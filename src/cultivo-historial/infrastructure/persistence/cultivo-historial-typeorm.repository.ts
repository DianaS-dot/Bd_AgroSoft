import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CultivoHistorialRepository } from "../../domain/ports/cultivo-historial.repository";
import { CultivoHistorial } from "../../domain/entities/cultivo-historial";
import { CultivoHistorialOrmEntity } from "./cultivo-historial.orm.entity";

@Injectable()
export class CultivoHistorialPostgresRepository
implements CultivoHistorialRepository {

  constructor(

    @InjectRepository(CultivoHistorialOrmEntity)
    private readonly repository: Repository<CultivoHistorialOrmEntity>,

  ) {}

  async crear(
    historial: CultivoHistorial,
  ): Promise<CultivoHistorial> {

    const entity = this.repository.create({

      cultivo: {
        id: historial.cultivoId,
      },

      usuarioId: historial.usuarioId,

      motivo: historial.motivo,

      cambios: historial.cambios,

    });

    const resultado = await this.repository.save(entity);

    return new CultivoHistorial({

      id: resultado.id,
      cultivoId: resultado.cultivo.id,
      usuarioId: resultado.usuarioId,
      motivo: resultado.motivo,
      cambios: resultado.cambios,

    });

  }

  async obtenerTodos(): Promise<CultivoHistorial[]> {

    const historial = await this.repository.find({

      relations: {

        cultivo: true,

      },

    });

    return historial.map(h => new CultivoHistorial({

      id: h.id,
      cultivoId: h.cultivo.id,
      usuarioId: h.usuarioId,
      motivo: h.motivo,
      cambios: h.cambios,

    }));

  }

  async obtenerPorId(
    id: number,
  ): Promise<CultivoHistorial | null> {

    const historial = await this.repository.findOne({

      where: { id },

      relations: {

        cultivo: true,

      },

    });

    if (!historial) return null;

    return new CultivoHistorial({

      id: historial.id,
      cultivoId: historial.cultivo.id,
      usuarioId: historial.usuarioId,
      motivo: historial.motivo,
      cambios: historial.cambios,

    });

  }

  async actualizar(
    historial: CultivoHistorial,
  ): Promise<CultivoHistorial> {

    await this.repository.save({

      id: historial.id,

      cultivo: {

        id: historial.cultivoId,

      },

      usuarioId: historial.usuarioId,

      motivo: historial.motivo,

      cambios: historial.cambios,

    });

    return (await this.obtenerPorId(historial.id!))!;

  }

  async eliminar(id: number): Promise<void> {

    await this.repository.delete(id);

  }

}