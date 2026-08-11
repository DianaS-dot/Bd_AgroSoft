import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEvidencia } from './entities/actividad_evidencia.entity';
import { CreateActividadEvidenciaDto } from './dto/create-actividad_evidencia.dto';
import { UpdateActividadEvidenciaDto } from './dto/update-actividad_evidencia.dto';

@Injectable()
export class ActividadesEvidenciasService {
  constructor(
    @InjectRepository(ActividadEvidencia)
    private readonly evidenciasRepository: Repository<ActividadEvidencia>,
  ) {}

  create(createDto: CreateActividadEvidenciaDto) {
    const evidencia = this.evidenciasRepository.create(createDto);
    return this.evidenciasRepository.save(evidencia);
  }

  findAll() {
    return this.evidenciasRepository.find({ relations: ['actividad'] });
  }

  async findOne(id: number) {
    const evidencia = await this.evidenciasRepository.findOne({
      where: { id_actividad_evidencia: id },
      relations: ['actividad'],
    });

    if (!evidencia) {
      throw new NotFoundException(`Evidencia de actividad con id ${id} no encontrada`);
    }

    return evidencia;
  }

  async update(id: number, updateDto: UpdateActividadEvidenciaDto) {
    await this.findOne(id);
    await this.evidenciasRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.evidenciasRepository.delete(id);
    return { deleted: true };
  }
}
