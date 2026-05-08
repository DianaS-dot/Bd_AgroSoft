import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciaController } from './evidencia.controller';
import { EvidenciaService } from './evidencia.service';

describe('EvidenciaController', () => {
  let controller: EvidenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvidenciaController],
      providers: [EvidenciaService],
    }).compile();

    controller = module.get<EvidenciaController>(EvidenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
