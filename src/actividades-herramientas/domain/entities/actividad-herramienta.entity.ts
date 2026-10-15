export interface ActividadHerramientaProps {
  id_actividad_herramienta?: number;
  id_actividad: number;
  nombre_herramienta: string;
  cantidad?: number;
  unidad_medida?: string;
  estado_uso?: string;
  observaciones?: string;
}

export class ActividadHerramientaDomain {
  private constructor(private readonly props: ActividadHerramientaProps) {}

  static create(props: ActividadHerramientaProps): ActividadHerramientaDomain {
    return new ActividadHerramientaDomain({
      ...props,
      cantidad: props.cantidad ?? 1,
    });
  }

  static fromPersistence(props: ActividadHerramientaProps): ActividadHerramientaDomain {
    return new ActividadHerramientaDomain(props);
  }

  toPrimitives(): ActividadHerramientaProps {
    return { ...this.props };
  }
}
