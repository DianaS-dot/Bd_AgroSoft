import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { Sensor } from "../../domain/entities/sensor";

@Injectable()
export class MqttSensorListener implements OnModuleInit {

  private readonly logger = new Logger(MqttSensorListener.name);

  onModuleInit() {
    this.logger.log('MQTT Sensor Listener inicializado');
  }

  handleSensorData(topic: string, payload: Buffer) {

    this.logger.log(`Mensaje recibido en topic: ${topic}`);
    this.logger.log(`Payload: ${payload.toString()}`);

    try {

      const data = JSON.parse(payload.toString());

      this.logger.log(`Datos del sensor: ${JSON.stringify(data)}`);

    } catch (error) {

      this.logger.error(`Error al procesar mensaje MQTT: ${error}`);

    }

  }

}
