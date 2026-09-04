export class IotGlobalConfigNotFoundException extends Error {
  constructor(id: number) {
    super(`IotGlobalConfig con id ${id} no encontrada`);
    this.name = 'IotGlobalConfigNotFoundException';
  }
}
//# sourceMappingURL=iot-global-config-not-found.exception.js.map
