import { Injectable } from '@nestjs/common';
import { CreateActividadUseCase } from './application/use-cases/create-actividad.use-case';
import { DeleteActividadUseCase } from './application/use-cases/delete-actividad.use-case';
import { FindActividadByIdUseCase } from './application/use-cases/find-actividad-by-id.use-case';
import { FindAllActividadesUseCase } from './application/use-cases/find-all-actividades.use-case';
import { UpdateActividadUseCase } from './application/use-cases/update-actividad.use-case';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Injectable()
export class ActividadesService {
  constructor(
    private readonly createActividadUseCase: CreateActividadUseCase,
    private readonly findAllActividadesUseCase: FindAllActividadesUseCase,
    private readonly findActividadByIdUseCase: FindActividadByIdUseCase,
    private readonly updateActividadUseCase: UpdateActividadUseCase,
    private readonly deleteActividadUseCase: DeleteActividadUseCase,
  ) {}

  async create(createActividadDto: CreateActividadDto) {
    const actividad = await this.createActividadUseCase.execute(createActividadDto);
    return actividad.toPrimitives();
  }

  async findAll() {
    const actividades = await this.findAllActividadesUseCase.execute();
    return actividades.map((actividad) => actividad.toPrimitives());
  }

  async findOne(id: number) {
    const actividad = await this.findActividadByIdUseCase.execute(id);
    return actividad.toPrimitives();
  }

  async update(id: number, updateActividadDto: UpdateActividadDto) {
    const actividad = await this.updateActividadUseCase.execute(id, updateActividadDto);
    return actividad.toPrimitives();
  }

  remove(id: number) {
    return this.deleteActividadUseCase.execute(id);
  }
}
