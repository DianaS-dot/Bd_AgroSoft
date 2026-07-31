import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvidenciaController } from './evidencia.controller';
import { EvidenciaService } from './evidencia.service';
import { Evidencia } from './entities/evidencia.entity';

describe('EvidenciaController', () => {
  let controller: EvidenciaController;
  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvidenciaController],
      providers: [
        EvidenciaService,
        {
          provide: getRepositoryToken(Evidencia),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    controller = module.get<EvidenciaController>(EvidenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
