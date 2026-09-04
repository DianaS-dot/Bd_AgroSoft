export class Lote {
  id?: number; // el id es opcional porque se genera automaticamente en la base de datos
  nombre!: string; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse`
  geom!: string; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse
  areaM2!: number; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse
  areaHa!: number; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse
  centroide!: string; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse
  descripcion!: string; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse
  estado!: string; // el ! le dice a typescript que esta propiedad tendra un valor antes de usarse

  constructor(data: Partial<Lote>) {
    Object.assign(this, data);
  }
}

// partiellote le dice a typescript que se recibe un objeto que puede tener una o varias propiedades de lote sin tener que escribir una variable con muchos parametros

// object.assing copia las propiedades de data al objeto actual
// el ! le dice a typeScript que esa prpiedades tendra un valor antes de usarse
