import { Test, TestingModule } from '@nestjs/testing';
import { CultivoRealService } from './cultivo_real.service';

describe('CultivoRealService', () => {
  let service: CultivoRealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultivoRealService],
    }).compile();

    service = module.get<CultivoRealService>(CultivoRealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
