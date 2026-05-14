import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultivoReal } from './entities/cultivo_real.entity';
import { CreateCultivoRealDto } from './dto/create-cultivo_real.dto';
import { UpdateCultivoRealDto } from './dto/update-cultivo_real.dto';

@Injectable()
export class CultivoRealService {
  constructor(
    @InjectRepository(CultivoReal)
    private readonly cultivoRealRepository: Repository<CultivoReal>,
  ) {}

  create(createCultivoRealDto: CreateCultivoRealDto) {
    const nuevoCultivoReal = this.cultivoRealRepository.create(createCultivoRealDto);
    return this.cultivoRealRepository.save(nuevoCultivoReal);
  }

  findAll() {
    return this.cultivoRealRepository.find({ relations: ['cultivoBase'] });
  }

  findOne(id: number) {
    return this.cultivoRealRepository.findOne({
      where: { id_cultivo_real: id },
      relations: ['cultivoBase'],
    });
  }

  async update(id: number, updateCultivoRealDto: UpdateCultivoRealDto) {
    await this.cultivoRealRepository.update(id, updateCultivoRealDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.cultivoRealRepository.delete(id);
    return { deleted: true };
  }
}