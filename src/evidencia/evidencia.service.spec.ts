import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Evidencia } from './entities/evidencia.entity';
import { EvidenciaService } from './evidencia.service';

describe('EvidenciaService', () => {
  let service: EvidenciaService;
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
      providers: [
        EvidenciaService,
        {
          provide: getRepositoryToken(Evidencia),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<EvidenciaService>(EvidenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
