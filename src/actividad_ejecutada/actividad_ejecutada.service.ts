import { Injectable } from '@nestjs/common';
import { CreateActividadEjecutadaDto } from './dto/create-actividad_ejecutada.dto';
import { UpdateActividadEjecutadaDto } from './dto/update-actividad_ejecutada.dto';

@Injectable()
export class ActividadEjecutadaService {
  create(createActividadEjecutadaDto: CreateActividadEjecutadaDto) {
    return 'This action adds a new actividadEjecutada';
  }

  findAll() {
    return `This action returns all actividadEjecutada`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actividadEjecutada`;
  }

  update(id: number, updateActividadEjecutadaDto: UpdateActividadEjecutadaDto) {
    return `This action updates a #${id} actividadEjecutada`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividadEjecutada`;
  }
}
