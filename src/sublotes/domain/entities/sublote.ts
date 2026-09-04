export class Sublote {
  id?: number;

  nombre!: string;

  loteId!: number;

  geom!: string;

  areaM2!: number;

  areaHa!: number;

  centroide!: string;

  descripcion!: string;

  estado!: string;

  constructor(data: Partial<Sublote>) {
    Object.assign(this, data);
  }
}

// aqui si se utiliza loteId porque el dominio solamente neceistasaber que un soblote pertenece a un lote
