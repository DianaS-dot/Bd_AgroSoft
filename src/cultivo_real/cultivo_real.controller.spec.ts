import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CultivoRealController } from './cultivo_real.controller';
import { CultivoRealService } from './cultivo_real.service';
import { CultivoReal } from './entities/cultivo_real.entity';

describe('CultivoRealController', () => {
  let controller: CultivoRealController;
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
      controllers: [CultivoRealController],
      providers: [
        CultivoRealService,
        {
          provide: getRepositoryToken(CultivoReal),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    controller = module.get<CultivoRealController>(CultivoRealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
