import { Test, TestingModule } from '@nestjs/testing';
import { CultivoRealController } from './cultivo_real.controller';
import { CultivoRealService } from './cultivo_real.service';

describe('CultivoRealController', () => {
  let controller: CultivoRealController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CultivoRealController],
      providers: [CultivoRealService],
    }).compile();

    controller = module.get<CultivoRealController>(CultivoRealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
