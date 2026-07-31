import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CultivoBaseController } from './cultivo_base.controller';
import { CultivoBaseService } from './cultivo_base.service';
import { CultivoBase } from './entities/cultivo_base.entity';

describe('CultivoBaseController', () => {
  let controller: CultivoBaseController;
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
      controllers: [CultivoBaseController],
      providers: [
        CultivoBaseService,
        {
          provide: getRepositoryToken(CultivoBase),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    controller = module.get<CultivoBaseController>(CultivoBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
