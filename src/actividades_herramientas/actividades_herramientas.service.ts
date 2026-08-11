import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadHerramienta } from './entities/actividad_herramienta.entity';
import { CreateActividadHerramientaDto } from './dto/create-actividad_herramienta.dto';
import { UpdateActividadHerramientaDto } from './dto/update-actividad_herramienta.dto';

@Injectable()
export class ActividadesHerramientasService {
  constructor(
    @InjectRepository(ActividadHerramienta)
    private readonly herramientasRepository: Repository<ActividadHerramienta>,
  ) {}

  create(createDto: CreateActividadHerramientaDto) {
    const herramienta = this.herramientasRepository.create(createDto);
    return this.herramientasRepository.save(herramienta);
  }

  findAll() {
    return this.herramientasRepository.find({ relations: ['actividad'] });
  }

  async findOne(id: number) {
    const herramienta = await this.herramientasRepository.findOne({
      where: { id_actividad_herramienta: id },
      relations: ['actividad'],
    });

    if (!herramienta) {
      throw new NotFoundException(`Herramienta de actividad con id ${id} no encontrada`);
    }

    return herramienta;
  }

  async update(id: number, updateDto: UpdateActividadHerramientaDto) {
    await this.findOne(id);
    await this.herramientasRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.herramientasRepository.delete(id);
    return { deleted: true };
  }
}
