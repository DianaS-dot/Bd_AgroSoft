import { Inject, Injectable } from '@nestjs/common';
import { Notificacion } from '../../domain/entities/notificacion.entity';
import type { NotificacionRepository } from '../../domain/ports/notificacion.repository.port';
import { NOTIFICACION_REPOSITORY } from '../../domain/ports/notificacion.repository.port';

@Injectable()
export class CreateNotificacionUseCase {
  constructor(
    @Inject(NOTIFICACION_REPOSITORY)
    private readonly notificacionRepository: NotificacionRepository,
  ) {}

  async execute(input: {
    titulo: string;
    mensaje: string;
    leida?: boolean;
    tipo: string;
    metadata?: Record<string, any>;
    usuarioId: number;
  }): Promise<Notificacion> {
    const notificacion = Notificacion.create(input);
    return this.notificacionRepository.save(notificacion);
  }
}