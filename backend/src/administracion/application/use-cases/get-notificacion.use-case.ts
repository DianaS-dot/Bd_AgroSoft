import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Notificacion } from '../../domain/entities/notificacion.entity';
import type { NotificacionRepository } from '../../domain/ports/notificacion.repository.port';
import { NOTIFICACION_REPOSITORY } from '../../domain/ports/notificacion.repository.port';

@Injectable()
export class GetNotificacionUseCase {
  constructor(
    @Inject(NOTIFICACION_REPOSITORY)
    private readonly notificacionRepository: NotificacionRepository,
  ) {}

  async execute(id?: number): Promise<Notificacion | Notificacion[]> {
    if (id !== undefined) {
      const notificacion = await this.notificacionRepository.findById(id);
      if (!notificacion) {
        throw new NotFoundException(`Notificación con id ${id} no encontrada`);
      }
      return notificacion;
    }
    return this.notificacionRepository.findAll();
  }
}