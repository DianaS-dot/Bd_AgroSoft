import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivoRealService } from './cultivo_real.service';
import { CultivoRealController } from './cultivo_real.controller';
import { CultivoReal } from './entities/cultivo_real.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivoReal])],
  controllers: [CultivoRealController],
  providers: [CultivoRealService],
})
export class CultivoRealModule {}
