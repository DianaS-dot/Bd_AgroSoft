import { Test, TestingModule } from '@nestjs/testing';
import { CultivoBaseController } from './cultivo_base.controller';
import { CultivoBaseService } from './cultivo_base.service';

describe('CultivoBaseController', () => {
  let controller: CultivoBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivoBaseController],
      providers: [CultivoBaseService],
    }).compile();

    controller = module.get<CultivoBaseController>(CultivoBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
