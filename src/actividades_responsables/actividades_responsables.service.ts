import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadResponsable } from './entities/actividad_responsable.entity';
import { CreateActividadResponsableDto } from './dto/create-actividad_responsable.dto';
import { UpdateActividadResponsableDto } from './dto/update-actividad_responsable.dto';

@Injectable()
export class ActividadesResponsablesService {
  constructor(
    @InjectRepository(ActividadResponsable)
    private readonly responsablesRepository: Repository<ActividadResponsable>,
  ) {}

  create(createDto: CreateActividadResponsableDto) {
    const responsable = this.responsablesRepository.create(createDto);
    return this.responsablesRepository.save(responsable);
  }

  findAll() {
    return this.responsablesRepository.find({ relations: ['actividad'] });
  }

  async findOne(id: number) {
    const responsable = await this.responsablesRepository.findOne({
      where: { id_actividad_responsable: id },
      relations: ['actividad'],
    });

    if (!responsable) {
      throw new NotFoundException(`Responsable de actividad con id ${id} no encontrado`);
    }

    return responsable;
  }

  async update(id: number, updateDto: UpdateActividadResponsableDto) {
    await this.findOne(id);
    await this.responsablesRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.responsablesRepository.delete(id);
    return { deleted: true };
  }
}
