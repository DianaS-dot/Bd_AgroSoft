export type ActividadEstado = 'pendiente' | 'en_proceso' | 'completada' | 'cancelada' | string;
export type ActividadPrioridad = 'baja' | 'media' | 'alta' | string;

export interface Actividad {
  id_actividad: number;
  titulo: string;
  descripcion?: string;
  tipo_actividad: string;
  estado: ActividadEstado;
  prioridad: ActividadPrioridad;
  fecha_programada?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  id_cultivo_real?: number;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  responsables?: unknown[];
  evidencias?: unknown[];
  servicios?: unknown[];
  herramientas?: unknown[];
  historial?: unknown[];
}

export type ActividadFormValues = {
  titulo: string;
  descripcion: string;
  tipo_actividad: string;
  estado: ActividadEstado;
  prioridad: ActividadPrioridad;
  fecha_programada: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_cultivo_real: string;
};

export type ActividadPayload = {
  titulo: string;
  descripcion?: string;
  tipo_actividad: string;
  estado?: ActividadEstado;
  prioridad?: ActividadPrioridad;
  fecha_programada?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  id_cultivo_real?: number;
};
