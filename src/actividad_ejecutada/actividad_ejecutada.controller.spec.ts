import { Test, TestingModule } from '@nestjs/testing';
import { ActividadEjecutadaController } from './actividad_ejecutada.controller';
import { ActividadEjecutadaService } from './actividad_ejecutada.service';

describe('ActividadEjecutadaController', () => {
  let controller: ActividadEjecutadaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActividadEjecutadaController],
      providers: [ActividadEjecutadaService],
    }).compile();

    controller = module.get<ActividadEjecutadaController>(ActividadEjecutadaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
