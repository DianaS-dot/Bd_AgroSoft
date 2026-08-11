import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadServicio } from './entities/actividad_servicio.entity';
import { CreateActividadServicioDto } from './dto/create-actividad_servicio.dto';
import { UpdateActividadServicioDto } from './dto/update-actividad_servicio.dto';

@Injectable()
export class ActividadesServiciosService {
  constructor(
    @InjectRepository(ActividadServicio)
    private readonly serviciosRepository: Repository<ActividadServicio>,
  ) {}

  create(createDto: CreateActividadServicioDto) {
    const servicio = this.serviciosRepository.create(createDto);
    return this.serviciosRepository.save(servicio);
  }

  findAll() {
    return this.serviciosRepository.find({ relations: ['actividad'] });
  }

  async findOne(id: number) {
    const servicio = await this.serviciosRepository.findOne({
      where: { id_actividad_servicio: id },
      relations: ['actividad'],
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio de actividad con id ${id} no encontrado`);
    }

    return servicio;
  }

  async update(id: number, updateDto: UpdateActividadServicioDto) {
    await this.findOne(id);
    await this.serviciosRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.serviciosRepository.delete(id);
    return { deleted: true };
  }
}
