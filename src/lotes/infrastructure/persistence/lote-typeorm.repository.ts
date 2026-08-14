import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { LoteRepository } from "../../domain/ports/lote.repository";
import { Lote } from "../../domain/entities/lote";
import { LoteOrmEntity } from "./lote.orm-entity";

@Injectable()
export class LotePostgresRepository implements LoteRepository {

  constructor(
    @InjectRepository(LoteOrmEntity)
    private readonly repository: Repository<LoteOrmEntity>,
  ) {}

  async crear(lote: Lote): Promise<Lote> {

    const entity = this.repository.create({
      nombre: lote.nombre,
      geom: lote.geom,
      areaM2: lote.areaM2,
      areaHa: lote.areaHa,
      centroide: lote.centroide,
      descripcion: lote.descripcion,
      estado: lote.estado,
    });

    const resultado = await this.repository.save(entity);

    return new Lote({
      id: resultado.id,
      nombre: resultado.nombre,
      geom: resultado.geom,
      areaM2: resultado.areaM2,
      areaHa: resultado.areaHa,
      centroide: resultado.centroide,
      descripcion: resultado.descripcion,
      estado: resultado.estado,
    });

  }

  async obtenerTodos(): Promise<Lote[]> {

    const lotes = await this.repository.find();

    return lotes.map(l => new Lote({
      id: l.id,
      nombre: l.nombre,
      geom: l.geom,
      areaM2: l.areaM2,
      areaHa: l.areaHa,
      centroide: l.centroide,
      descripcion: l.descripcion,
      estado: l.estado,
    }));

  }

  async obtenerPorId(id: number): Promise<Lote | null> {

    const lote = await this.repository.findOne({
      where: { id }
    });

    if (!lote) return null;

    return new Lote({
      id: lote.id,
      nombre: lote.nombre,
      geom: lote.geom,
      areaM2: lote.areaM2,
      areaHa: lote.areaHa,
      centroide: lote.centroide,
      descripcion: lote.descripcion,
      estado: lote.estado,
    });

  }

  async actualizar(lote: Lote): Promise<Lote> {

    await this.repository.update(lote.id!, {

      nombre: lote.nombre,
      geom: lote.geom,
      areaM2: lote.areaM2,
      areaHa: lote.areaHa,
      centroide: lote.centroide,
      descripcion: lote.descripcion,
      estado: lote.estado,

    });

    return (await this.obtenerPorId(lote.id!))!;

  }

  async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }

}