import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultivoBase } from './entities/cultivo_base.entity';
import { CreateCultivoBaseDto } from './dto/create-cultivo_base.dto';
import { UpdateCultivoBaseDto } from './dto/update-cultivo_base.dto';

@Injectable()
export class CultivoBaseService {
  constructor(
    @InjectRepository(CultivoBase)
    private readonly cultivoBaseRepository: Repository<CultivoBase>,
  ) {}

  create(createCultivoBaseDto: CreateCultivoBaseDto) {
    const nuevoCultivo = this.cultivoBaseRepository.create(createCultivoBaseDto);
    return this.cultivoBaseRepository.save(nuevoCultivo);
  }

  findAll() {
    return this.cultivoBaseRepository.find();
  }

  findOne(id: number) {
    return this.cultivoBaseRepository.findOneBy({ id_cultivo_base: id });
  }

  async update(id: number, updateCultivoBaseDto: UpdateCultivoBaseDto) {
    await this.cultivoBaseRepository.update(id, updateCultivoBaseDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.cultivoBaseRepository.delete(id);
    return { deleted: true };
  }
}
