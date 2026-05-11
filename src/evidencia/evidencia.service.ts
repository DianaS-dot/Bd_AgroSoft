import { Injectable } from '@nestjs/common';
import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';

@Injectable()
export class EvidenciaService {
  create(createEvidenciaDto: CreateEvidenciaDto) {
    return 'This action adds a new evidencia';
  }

  findAll() {
    return `This action returns all evidencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evidencia`;
  }

  update(id: number, updateEvidenciaDto: UpdateEvidenciaDto) {
    return `This action updates a #${id} evidencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} evidencia`;
  }
}
