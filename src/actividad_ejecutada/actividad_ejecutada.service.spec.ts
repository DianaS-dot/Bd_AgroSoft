import { Test, TestingModule } from '@nestjs/testing';
import { ActividadEjecutadaService } from './actividad_ejecutada.service';

describe('ActividadEjecutadaService', () => {
  let service: ActividadEjecutadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActividadEjecutadaService],
    }).compile();

    service = module.get<ActividadEjecutadaService>(ActividadEjecutadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
