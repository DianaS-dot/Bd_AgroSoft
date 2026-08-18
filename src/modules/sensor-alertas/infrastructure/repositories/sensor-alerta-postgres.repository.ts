import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SensorAlertaRepository } from "../../domain/ports/sensor-alerta.repository";
import { SensorAlerta } from "../../domain/entities/sensor-alerta";
import { SensorAlertaOrmEntity } from "../database/sensor-alerta.orm-entity";

@Injectable()
export class SensorAlertaPostgresRepository implements SensorAlertaRepository {

  constructor(
    @InjectRepository(SensorAlertaOrmEntity)
    private readonly repository: Repository<SensorAlertaOrmEntity>,
  ) {}

  async crear(alerta: SensorAlerta): Promise<SensorAlerta> {

    const entity = this.repository.create({

      sensorId: alerta.sensorId,
      valor: alerta.valor,
      umbral: alerta.umbral,
      tipo: alerta.tipo,
      fechaAlerta: alerta.fechaAlerta,
      loteId: alerta.loteId,
      subLoteId: alerta.subLoteId,

    });

    const resultado = await this.repository.save(entity);

    return new SensorAlerta({

      id: resultado.id,
      sensorId: resultado.sensorId,
      valor: resultado.valor,
      umbral: resultado.umbral,
      tipo: resultado.tipo,
      fechaAlerta: resultado.fechaAlerta,
      loteId: resultado.loteId,
      subLoteId: resultado.subLoteId,

    });

  }

  async obtenerTodas(): Promise<SensorAlerta[]> {

    const alertas = await this.repository.find();

    return alertas.map((a) =>
      new SensorAlerta({

        id: a.id,
        sensorId: a.sensorId,
        valor: a.valor,
        umbral: a.umbral,
        tipo: a.tipo,
        fechaAlerta: a.fechaAlerta,
        loteId: a.loteId,
        subLoteId: a.subLoteId,

      }),
    );

  }

  async obtenerPorId(id: number): Promise<SensorAlerta | null> {

    const alerta = await this.repository.findOne({ where: { id } });

    if (!alerta) {
      return null;
    }

    return new SensorAlerta({

      id: alerta.id,
      sensorId: alerta.sensorId,
      valor: alerta.valor,
      umbral: alerta.umbral,
      tipo: alerta.tipo,
      fechaAlerta: alerta.fechaAlerta,
      loteId: alerta.loteId,
      subLoteId: alerta.subLoteId,

    });

  }

  async obtenerPorSensor(sensorId: number): Promise<SensorAlerta[]> {

    const alertas = await this.repository.find({

      where: { sensorId },
      order: { fechaAlerta: 'DESC' },

    });

    return alertas.map((a) =>
      new SensorAlerta({

        id: a.id,
        sensorId: a.sensorId,
        valor: a.valor,
        umbral: a.umbral,
        tipo: a.tipo,
        fechaAlerta: a.fechaAlerta,
        loteId: a.loteId,
        subLoteId: a.subLoteId,

      }),
    );

  }

  async eliminar(id: number): Promise<void> {

    await this.repository.delete(id);

  }

}
