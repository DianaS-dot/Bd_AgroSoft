export class ValorFueraDeRangoException extends Error {
  constructor(sensorId: number, valor: number, minimo: number, maximo: number) {
    super(
      `Sensor ${sensorId}: valor ${valor} fuera de rango [${minimo}, ${maximo}]`,
    );
    this.name = 'ValorFueraDeRangoException';
  }
}
