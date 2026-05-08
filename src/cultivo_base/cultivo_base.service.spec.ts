import { Test, TestingModule } from '@nestjs/testing';
import { CultivoBaseService } from './cultivo_base.service';

describe('CultivoBaseService', () => {
  let service: CultivoBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultivoBaseService],
    }).compile();

    service = module.get<CultivoBaseService>(CultivoBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
