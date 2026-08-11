import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadesRepository: Repository<Actividad>,
  ) {}

  create(createActividadDto: CreateActividadDto) {
    const actividad = this.actividadesRepository.create(createActividadDto);
    return this.actividadesRepository.save(actividad);
  }

  findAll() {
    return this.actividadesRepository.find({
      relations: ['responsables', 'evidencias', 'servicios', 'herramientas', 'historial'],
    });
  }

  async findOne(id: number) {
    const actividad = await this.actividadesRepository.findOne({
      where: { id_actividad: id },
      relations: ['responsables', 'evidencias', 'servicios', 'herramientas', 'historial'],
    });

    if (!actividad) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }

    return actividad;
  }

  async update(id: number, updateActividadDto: UpdateActividadDto) {
    await this.findOne(id);
    await this.actividadesRepository.update(id, updateActividadDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.actividadesRepository.delete(id);
    return { deleted: true };
  }
}
