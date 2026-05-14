import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidencia } from './entities/evidencia.entity';
import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';

@Injectable()
export class EvidenciaService {
  constructor(
    @InjectRepository(Evidencia)
    private readonly evidenciaRepository: Repository<Evidencia>,
  ) {}

  create(createEvidenciaDto: CreateEvidenciaDto) {
    const nuevaEvidencia = this.evidenciaRepository.create(createEvidenciaDto);
    return this.evidenciaRepository.save(nuevaEvidencia);
  }

  findAll() {
    return this.evidenciaRepository.find();
  }

  findOne(id: number) {
    return this.evidenciaRepository.findOneBy({ id_evidencia: id });
  }

  async update(id: number, updateEvidenciaDto: UpdateEvidenciaDto) {
    await this.evidenciaRepository.update(id, updateEvidenciaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.evidenciaRepository.delete(id);
    return { deleted: true };
  }
}
