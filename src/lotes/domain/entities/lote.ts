
export class Lote {

  id?: number;
  nombre!: string;
  geom!: string;
  areaM2!: number;
  areaHa!: number;
  centroide!: string;
  descripcion!: string;
  estado!: string;

  constructor(data: Partial<Lote>) {
    Object.assign(this, data);
  }

}

// partiellote le dice a typescript que se recibe un objeto que puede tener una o varias propiedades de lote sin tener que escribir una variable con muchos parametros

// object.assing copia las propiedades de data al objeto actual
// el ! le dice a typeScript que esa prpiedades tendra un valor antes de usarse 