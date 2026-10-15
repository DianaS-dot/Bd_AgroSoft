export interface ActividadHistorialProps {
  id_actividad_historial?: number;
  id_actividad: number;
  accion: string;
  estado_anterior?: string;
  estado_nuevo?: string;
  id_usuario: number;
  observaciones?: string;
  fecha_registro?: Date;
}

export class ActividadHistorialDomain {
  private constructor(private readonly props: ActividadHistorialProps) {}

  static create(props: ActividadHistorialProps): ActividadHistorialDomain {
    return new ActividadHistorialDomain(props);
  }

  static fromPersistence(props: ActividadHistorialProps): ActividadHistorialDomain {
    return new ActividadHistorialDomain(props);
  }

  toPrimitives(): ActividadHistorialProps {
    return { ...this.props };
  }
}
