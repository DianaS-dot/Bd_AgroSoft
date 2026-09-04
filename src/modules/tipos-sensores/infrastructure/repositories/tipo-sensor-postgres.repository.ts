import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TipoSensorRepository } from '../../domain/ports/tipo-sensor.repository';
import { TipoSensor } from '../../domain/entities/tipo-sensor';
import { TipoSensorOrmEntity } from '../database/tipo-sensor.orm-entity';

@Injectable()
export class TipoSensorPostgresRepository implements TipoSensorRepository {
  constructor(
    @InjectRepository(TipoSensorOrmEntity)
    private readonly repository: Repository<TipoSensorOrmEntity>,
  ) {}

  async crear(tipoSensor: TipoSensor): Promise<TipoSensor> {
    const entity = this.repository.create({
      nombre: tipoSensor.nombre,
      unidad: tipoSensor.unidad,
      decimales: tipoSensor.decimales,
      descripcion: tipoSensor.descripcion,
      imagen: tipoSensor.imagen,
      ttlMinutos: tipoSensor.ttlMinutos,
    });

    const resultado = await this.repository.save(entity);

    return new TipoSensor({
      id: resultado.id,
      nombre: resultado.nombre,
      unidad: resultado.unidad,
      decimales: resultado.decimales,
      descripcion: resultado.descripcion,
      imagen: resultado.imagen,
      ttlMinutos: resultado.ttlMinutos,
    });
  }

  async obtenerTodos(): Promise<TipoSensor[]> {
    const tipos = await this.repository.find();

    return tipos.map(
      (t) =>
        new TipoSensor({
          id: t.id,
          nombre: t.nombre,
          unidad: t.unidad,
          decimales: t.decimales,
          descripcion: t.descripcion,
          imagen: t.imagen,
          ttlMinutos: t.ttlMinutos,
        }),
    );
  }

  async obtenerPorId(id: number): Promise<TipoSensor | null> {
    const tipo = await this.repository.findOne({ where: { id } });

    if (!tipo) {
      return null;
    }

    return new TipoSensor({
      id: tipo.id,
      nombre: tipo.nombre,
      unidad: tipo.unidad,
      decimales: tipo.decimales,
      descripcion: tipo.descripcion,
      imagen: tipo.imagen,
      ttlMinutos: tipo.ttlMinutos,
    });
  }

  async actualizar(tipoSensor: TipoSensor): Promise<TipoSensor> {
    await this.repository.save({
      id: tipoSensor.id,

      nombre: tipoSensor.nombre,
      unidad: tipoSensor.unidad,
      decimales: tipoSensor.decimales,
      descripcion: tipoSensor.descripcion,
      imagen: tipoSensor.imagen,
      ttlMinutos: tipoSensor.ttlMinutos,
    });

    return (await this.obtenerPorId(tipoSensor.id!))!;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
