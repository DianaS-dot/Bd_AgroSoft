import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CultivoRepository } from '../../domain/ports/cultivo.repository';
import { Cultivo } from '../../domain/entities/cultivo';
import { CultivoOrmEntity } from '../database/cultivo.orm-entity';

@Injectable()
export class CultivoPostgresRepository implements CultivoRepository {
  constructor(
    @InjectRepository(CultivoOrmEntity)
    private readonly repository: Repository<CultivoOrmEntity>,
  ) {}

  async crear(cultivo: Cultivo): Promise<Cultivo> {
    const entity = this.repository.create({
      nombreCultivo: cultivo.nombreCultivo,
      tipoCultivo: cultivo.tipoCultivo,
      descripcion: cultivo.descripcion,

      loteId: cultivo.loteId,

      sublote: {
        id: cultivo.subloteId,
      },

      imgCultivo: cultivo.imgCultivo,
      fechaSiembra: cultivo.fechaSiembra,
      fechaFinalizacion: cultivo.fechaFinalizacion,
      costoTotal: cultivo.costoTotal,
      estado: cultivo.estado,
    });

    const resultado = await this.repository.save(entity);

    return new Cultivo({
      id: resultado.id,
      nombreCultivo: resultado.nombreCultivo,
      tipoCultivo: resultado.tipoCultivo,
      descripcion: resultado.descripcion,
      loteId: resultado.loteId,
      subloteId: resultado.sublote.id,
      imgCultivo: resultado.imgCultivo,
      fechaSiembra: resultado.fechaSiembra,
      fechaFinalizacion: resultado.fechaFinalizacion,
      costoTotal: resultado.costoTotal,
      estado: resultado.estado,
    });
  }

  async obtenerTodos(): Promise<Cultivo[]> {
    const cultivos = await this.repository.find({
      relations: {
        sublote: true,
      },
    });

    return cultivos.map(
      (c) =>
        new Cultivo({
          id: c.id,
          nombreCultivo: c.nombreCultivo,
          tipoCultivo: c.tipoCultivo,
          descripcion: c.descripcion,
          loteId: c.loteId,
          subloteId: c.sublote.id,
          imgCultivo: c.imgCultivo,
          fechaSiembra: c.fechaSiembra,
          fechaFinalizacion: c.fechaFinalizacion,
          costoTotal: c.costoTotal,
          estado: c.estado,
        }),
    );
  }

  async obtenerPorId(id: number): Promise<Cultivo | null> {
    const cultivo = await this.repository.findOne({
      where: { id },

      relations: {
        sublote: true,
      },
    });

    if (!cultivo) {
      return null;
    }

    return new Cultivo({
      id: cultivo.id,
      nombreCultivo: cultivo.nombreCultivo,
      tipoCultivo: cultivo.tipoCultivo,
      descripcion: cultivo.descripcion,
      loteId: cultivo.loteId,
      subloteId: cultivo.sublote.id,
      imgCultivo: cultivo.imgCultivo,
      fechaSiembra: cultivo.fechaSiembra,
      fechaFinalizacion: cultivo.fechaFinalizacion,
      costoTotal: cultivo.costoTotal,
      estado: cultivo.estado,
    });
  }

  async actualizar(cultivo: Cultivo): Promise<Cultivo> {
    await this.repository.save({
      id: cultivo.id,

      nombreCultivo: cultivo.nombreCultivo,
      tipoCultivo: cultivo.tipoCultivo,
      descripcion: cultivo.descripcion,

      loteId: cultivo.loteId,

      sublote: {
        id: cultivo.subloteId,
      },

      imgCultivo: cultivo.imgCultivo,
      fechaSiembra: cultivo.fechaSiembra,
      fechaFinalizacion: cultivo.fechaFinalizacion,
      costoTotal: cultivo.costoTotal,
      estado: cultivo.estado,
    });

    return (await this.obtenerPorId(cultivo.id!))!;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
