import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThanOrEqual, LessThanOrEqual, Between } from "typeorm";

import { SensorLecturaRepository } from "../../domain/ports/sensor-lectura.repository";
import { SensorLectura } from "../../domain/entities/sensor-lectura";
import { SensorLecturaOrmEntity } from "../database/sensor-lectura.orm-entity";

@Injectable()
export class SensorLecturaPostgresRepository implements SensorLecturaRepository {

  constructor(
    @InjectRepository(SensorLecturaOrmEntity)
    private readonly repository: Repository<SensorLecturaOrmEntity>,
  ) {}

  async registrar(lectura: SensorLectura): Promise<SensorLectura> {

    const entity = this.repository.create({

      sensorId: lectura.sensorId,
      valor: lectura.valor,
      fechaLectura: lectura.fechaLectura,
      unidad: lectura.unidad,
      observaciones: lectura.observaciones,

    });

    const resultado = await this.repository.save(entity);

    return new SensorLectura({

      id: resultado.id,
      sensorId: resultado.sensorId,
      valor: resultado.valor,
      fechaLectura: resultado.fechaLectura,
      unidad: resultado.unidad,
      observaciones: resultado.observaciones,
      createdAt: resultado.created_at,

    });

  }

  async obtenerPorSensor(sensorId: number): Promise<SensorLectura[]> {

    const lecturas = await this.repository.find({

      where: { sensorId },
      order: { fechaLectura: 'DESC' },

    });

    return lecturas.map((l) =>
      new SensorLectura({

        id: l.id,
        sensorId: l.sensorId,
        valor: l.valor,
        fechaLectura: l.fechaLectura,
        unidad: l.unidad,
        observaciones: l.observaciones,
        createdAt: l.created_at,

      }),
    );

  }

  async obtenerPorId(id: number): Promise<SensorLectura | null> {

    const lectura = await this.repository.findOne({ where: { id } });

    if (!lectura) {
      return null;
    }

    return new SensorLectura({

      id: lectura.id,
      sensorId: lectura.sensorId,
      valor: lectura.valor,
      fechaLectura: lectura.fechaLectura,
      unidad: lectura.unidad,
      observaciones: lectura.observaciones,
      createdAt: lectura.created_at,

    });

  }

  async obtenerPorRangoFechas(sensorId: number, desde: Date, hasta: Date): Promise<SensorLectura[]> {

    const lecturas = await this.repository.find({

      where: {

        sensorId,
        fechaLectura: Between(desde, hasta),

      },
      order: { fechaLectura: 'ASC' },

    });

    return lecturas.map((l) =>
      new SensorLectura({

        id: l.id,
        sensorId: l.sensorId,
        valor: l.valor,
        fechaLectura: l.fechaLectura,
        unidad: l.unidad,
        observaciones: l.observaciones,
        createdAt: l.created_at,

      }),
    );

  }

}
