import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadHistorial } from './entities/actividad_historial.entity';
import { CreateActividadHistorialDto } from './dto/create-actividad_historial.dto';
import { UpdateActividadHistorialDto } from './dto/update-actividad_historial.dto';

@Injectable()
export class ActividadHistorialService {
  constructor(
    @InjectRepository(ActividadHistorial)
    private readonly historialRepository: Repository<ActividadHistorial>,
  ) {}

  create(createDto: CreateActividadHistorialDto) {
    const historial = this.historialRepository.create(createDto);
    return this.historialRepository.save(historial);
  }

  findAll() {
    return this.historialRepository.find({ relations: ['actividad'] });
  }

  async findOne(id: number) {
    const historial = await this.historialRepository.findOne({
      where: { id_actividad_historial: id },
      relations: ['actividad'],
    });

    if (!historial) {
      throw new NotFoundException(`Historial de actividad con id ${id} no encontrado`);
    }

    return historial;
  }

  async update(id: number, updateDto: UpdateActividadHistorialDto) {
    await this.findOne(id);
    await this.historialRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.historialRepository.delete(id);
    return { deleted: true };
  }
}
