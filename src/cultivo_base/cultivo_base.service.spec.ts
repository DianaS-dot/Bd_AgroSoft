import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CultivoBase } from './entities/cultivo_base.entity';
import { CultivoBaseService } from './cultivo_base.service';

describe('CultivoBaseService', () => {
  let service: CultivoBaseService;
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
        CultivoBaseService,
        {
          provide: getRepositoryToken(CultivoBase),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<CultivoBaseService>(CultivoBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
