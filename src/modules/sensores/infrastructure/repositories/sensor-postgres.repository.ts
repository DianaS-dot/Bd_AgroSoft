import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SensorRepository } from '../../domain/ports/sensor.repository';
import { Sensor } from '../../domain/entities/sensor';
import { SensorOrmEntity } from '../database/sensor.orm-entity';

@Injectable()
export class SensorPostgresRepository implements SensorRepository {
  constructor(
    @InjectRepository(SensorOrmEntity)
    private readonly repository: Repository<SensorOrmEntity>,
  ) {}

  async crear(sensor: Sensor): Promise<Sensor> {
    const entity = this.repository.create({
      nombreSensor: sensor.nombreSensor,
      tipoSensorId: sensor.tipoSensorId,
      protocolo: sensor.protocolo,
      endpointUrl: sensor.endpointUrl,
      mqttTopic: sensor.mqttTopic,
      valorMinimoSensor: sensor.valorMinimoSensor,
      valorMaximoSensor: sensor.valorMaximoSensor,
      activo: sensor.activo,
      estadoConexion: sensor.estadoConexion,
      estado: sensor.estado,
      ultimoValor: sensor.ultimoValor,
      ultimaMedicion: sensor.ultimaMedicion,
      lastSeenAt: sensor.lastSeenAt,
      cultivoId: sensor.cultivoId,
      creadoPorUsuarioId: sensor.creadoPorUsuarioId,
      globalConfigId: sensor.globalConfigId,
      loteId: sensor.loteId,
      subLoteId: sensor.subLoteId,
    });

    const resultado = await this.repository.save(entity);

    return new Sensor({
      id: resultado.id,
      nombreSensor: resultado.nombreSensor,
      tipoSensorId: resultado.tipoSensorId,
      protocolo: resultado.protocolo,
      endpointUrl: resultado.endpointUrl,
      mqttTopic: resultado.mqttTopic,
      valorMinimoSensor: resultado.valorMinimoSensor,
      valorMaximoSensor: resultado.valorMaximoSensor,
      activo: resultado.activo,
      estadoConexion: resultado.estadoConexion,
      estado: resultado.estado,
      ultimoValor: resultado.ultimoValor,
      ultimaMedicion: resultado.ultimaMedicion,
      lastSeenAt: resultado.lastSeenAt,
      cultivoId: resultado.cultivoId,
      creadoPorUsuarioId: resultado.creadoPorUsuarioId,
      globalConfigId: resultado.globalConfigId,
      loteId: resultado.loteId,
      subLoteId: resultado.subLoteId,
    });
  }

  async obtenerTodos(): Promise<Sensor[]> {
    const sensores = await this.repository.find();

    return sensores.map(
      (s) =>
        new Sensor({
          id: s.id,
          nombreSensor: s.nombreSensor,
          tipoSensorId: s.tipoSensorId,
          protocolo: s.protocolo,
          endpointUrl: s.endpointUrl,
          mqttTopic: s.mqttTopic,
          valorMinimoSensor: s.valorMinimoSensor,
          valorMaximoSensor: s.valorMaximoSensor,
          activo: s.activo,
          estadoConexion: s.estadoConexion,
          estado: s.estado,
          ultimoValor: s.ultimoValor,
          ultimaMedicion: s.ultimaMedicion,
          lastSeenAt: s.lastSeenAt,
          cultivoId: s.cultivoId,
          creadoPorUsuarioId: s.creadoPorUsuarioId,
          globalConfigId: s.globalConfigId,
          loteId: s.loteId,
          subLoteId: s.subLoteId,
        }),
    );
  }

  async obtenerPorId(id: number): Promise<Sensor | null> {
    const sensor = await this.repository.findOne({ where: { id } });

    if (!sensor) {
      return null;
    }

    return new Sensor({
      id: sensor.id,
      nombreSensor: sensor.nombreSensor,
      tipoSensorId: sensor.tipoSensorId,
      protocolo: sensor.protocolo,
      endpointUrl: sensor.endpointUrl,
      mqttTopic: sensor.mqttTopic,
      valorMinimoSensor: sensor.valorMinimoSensor,
      valorMaximoSensor: sensor.valorMaximoSensor,
      activo: sensor.activo,
      estadoConexion: sensor.estadoConexion,
      estado: sensor.estado,
      ultimoValor: sensor.ultimoValor,
      ultimaMedicion: sensor.ultimaMedicion,
      lastSeenAt: sensor.lastSeenAt,
      cultivoId: sensor.cultivoId,
      creadoPorUsuarioId: sensor.creadoPorUsuarioId,
      globalConfigId: sensor.globalConfigId,
      loteId: sensor.loteId,
      subLoteId: sensor.subLoteId,
    });
  }

  async obtenerActivos(): Promise<Sensor[]> {
    const sensores = await this.repository.find({ where: { activo: true } });

    return sensores.map(
      (s) =>
        new Sensor({
          id: s.id,
          nombreSensor: s.nombreSensor,
          tipoSensorId: s.tipoSensorId,
          protocolo: s.protocolo,
          endpointUrl: s.endpointUrl,
          mqttTopic: s.mqttTopic,
          valorMinimoSensor: s.valorMinimoSensor,
          valorMaximoSensor: s.valorMaximoSensor,
          activo: s.activo,
          estadoConexion: s.estadoConexion,
          estado: s.estado,
          ultimoValor: s.ultimoValor,
          ultimaMedicion: s.ultimaMedicion,
          lastSeenAt: s.lastSeenAt,
          cultivoId: s.cultivoId,
          creadoPorUsuarioId: s.creadoPorUsuarioId,
          globalConfigId: s.globalConfigId,
          loteId: s.loteId,
          subLoteId: s.subLoteId,
        }),
    );
  }

  async actualizar(sensor: Sensor): Promise<Sensor> {
    await this.repository.save({
      id: sensor.id,

      nombreSensor: sensor.nombreSensor,
      tipoSensorId: sensor.tipoSensorId,
      protocolo: sensor.protocolo,
      endpointUrl: sensor.endpointUrl,
      mqttTopic: sensor.mqttTopic,
      valorMinimoSensor: sensor.valorMinimoSensor,
      valorMaximoSensor: sensor.valorMaximoSensor,
      activo: sensor.activo,
      estadoConexion: sensor.estadoConexion,
      estado: sensor.estado,
      ultimoValor: sensor.ultimoValor,
      ultimaMedicion: sensor.ultimaMedicion,
      lastSeenAt: sensor.lastSeenAt,
      cultivoId: sensor.cultivoId,
      creadoPorUsuarioId: sensor.creadoPorUsuarioId,
      globalConfigId: sensor.globalConfigId,
      loteId: sensor.loteId,
      subLoteId: sensor.subLoteId,
    });

    return (await this.obtenerPorId(sensor.id!))!;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
