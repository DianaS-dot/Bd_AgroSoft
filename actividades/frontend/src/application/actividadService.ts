import type { Actividad, ActividadFormValues, ActividadPayload } from '../domain/actividad';
import type { ActividadRepository } from '../domain/actividadRepository';

export class ActividadService {
  constructor(private readonly repository: ActividadRepository) {}

  findAll(): Promise<Actividad[]> {
    return this.repository.findAll();
  }

  create(values: ActividadFormValues): Promise<Actividad> {
    return this.repository.create(this.toPayload(values));
  }

  update(id: number, values: ActividadFormValues): Promise<Actividad> {
    return this.repository.update(id, this.toPayload(values));
  }

  remove(id: number): Promise<void> {
    return this.repository.remove(id);
  }

  private toPayload(values: ActividadFormValues): ActividadPayload {
    const payload: ActividadPayload = {
      titulo: values.titulo.trim(),
      tipo_actividad: values.tipo_actividad.trim(),
      descripcion: values.descripcion.trim() || undefined,
      estado: values.estado,
      prioridad: values.prioridad,
      fecha_programada: values.fecha_programada || undefined,
      fecha_inicio: values.fecha_inicio || undefined,
      fecha_fin: values.fecha_fin || undefined,
    };

    if (values.id_cultivo_real.trim()) {
      payload.id_cultivo_real = Number(values.id_cultivo_real);
    }

    return payload;
  }
}
