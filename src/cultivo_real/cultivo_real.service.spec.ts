import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CultivoReal } from './entities/cultivo_real.entity';
import { CultivoRealService } from './cultivo_real.service';

describe('CultivoRealService', () => {
  let service: CultivoRealService;
  const repositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultivoRealService,
        {
          provide: getRepositoryToken(CultivoReal),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<CultivoRealService>(CultivoRealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
