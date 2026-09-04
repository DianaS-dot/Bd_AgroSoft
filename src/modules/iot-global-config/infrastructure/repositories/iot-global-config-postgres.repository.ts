import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IotGlobalConfigRepository } from '../../domain/ports/iot-global-config.repository';
import { IotGlobalConfig } from '../../domain/entities/iot-global-config';
import { IotGlobalConfigOrmEntity } from '../database/iot-global-config.orm-entity';

@Injectable()
export class IotGlobalConfigPostgresRepository implements IotGlobalConfigRepository {
  constructor(
    @InjectRepository(IotGlobalConfigOrmEntity)
    private readonly repository: Repository<IotGlobalConfigOrmEntity>,
  ) {}

  async crear(config: IotGlobalConfig): Promise<IotGlobalConfig> {
    const entity = this.repository.create({
      name: config.name,
      broker: config.broker,
      port: config.port,
      protocol: config.protocol,
      topicPrefix: config.topicPrefix,
      defaultTopics: config.defaultTopics,
      customTopics: config.customTopics,
      loteId: config.loteId,
      subLoteId: config.subLoteId,
      username: config.username,
      password: config.password,
      activo: config.activo,
      defaultSensorsInitialized: config.defaultSensorsInitialized,
      autoDiscover: config.autoDiscover,
    });

    const resultado = await this.repository.save(entity);

    return new IotGlobalConfig({
      id: resultado.id,
      name: resultado.name,
      broker: resultado.broker,
      port: resultado.port,
      protocol: resultado.protocol,
      topicPrefix: resultado.topicPrefix,
      defaultTopics: resultado.defaultTopics,
      customTopics: resultado.customTopics,
      loteId: resultado.loteId,
      subLoteId: resultado.subLoteId,
      username: resultado.username,
      password: resultado.password,
      activo: resultado.activo,
      defaultSensorsInitialized: resultado.defaultSensorsInitialized,
      autoDiscover: resultado.autoDiscover,
    });
  }

  async obtenerTodas(): Promise<IotGlobalConfig[]> {
    const configs = await this.repository.find();

    return configs.map(
      (c) =>
        new IotGlobalConfig({
          id: c.id,
          name: c.name,
          broker: c.broker,
          port: c.port,
          protocol: c.protocol,
          topicPrefix: c.topicPrefix,
          defaultTopics: c.defaultTopics,
          customTopics: c.customTopics,
          loteId: c.loteId,
          subLoteId: c.subLoteId,
          username: c.username,
          password: c.password,
          activo: c.activo,
          defaultSensorsInitialized: c.defaultSensorsInitialized,
          autoDiscover: c.autoDiscover,
        }),
    );
  }

  async obtenerPorId(id: number): Promise<IotGlobalConfig | null> {
    const config = await this.repository.findOne({ where: { id } });

    if (!config) {
      return null;
    }

    return new IotGlobalConfig({
      id: config.id,
      name: config.name,
      broker: config.broker,
      port: config.port,
      protocol: config.protocol,
      topicPrefix: config.topicPrefix,
      defaultTopics: config.defaultTopics,
      customTopics: config.customTopics,
      loteId: config.loteId,
      subLoteId: config.subLoteId,
      username: config.username,
      password: config.password,
      activo: config.activo,
      defaultSensorsInitialized: config.defaultSensorsInitialized,
      autoDiscover: config.autoDiscover,
    });
  }

  async obtenerActiva(): Promise<IotGlobalConfig | null> {
    const config = await this.repository.findOne({ where: { activo: true } });

    if (!config) {
      return null;
    }

    return new IotGlobalConfig({
      id: config.id,
      name: config.name,
      broker: config.broker,
      port: config.port,
      protocol: config.protocol,
      topicPrefix: config.topicPrefix,
      defaultTopics: config.defaultTopics,
      customTopics: config.customTopics,
      loteId: config.loteId,
      subLoteId: config.subLoteId,
      username: config.username,
      password: config.password,
      activo: config.activo,
      defaultSensorsInitialized: config.defaultSensorsInitialized,
      autoDiscover: config.autoDiscover,
    });
  }

  async actualizar(config: IotGlobalConfig): Promise<IotGlobalConfig> {
    await this.repository.save({
      id: config.id,

      name: config.name,
      broker: config.broker,
      port: config.port,
      protocol: config.protocol,
      topicPrefix: config.topicPrefix,
      defaultTopics: config.defaultTopics,
      customTopics: config.customTopics,
      loteId: config.loteId,
      subLoteId: config.subLoteId,
      username: config.username,
      password: config.password,
      activo: config.activo,
      defaultSensorsInitialized: config.defaultSensorsInitialized,
      autoDiscover: config.autoDiscover,
    });

    return (await this.obtenerPorId(config.id!))!;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
