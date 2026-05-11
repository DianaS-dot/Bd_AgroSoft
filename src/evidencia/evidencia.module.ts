import { Module } from '@nestjs/common';
import { EvidenciaService } from './evidencia.service';
import { EvidenciaController } from './evidencia.controller';

@Module({
  controllers: [EvidenciaController],
  providers: [EvidenciaService],
})
export class EvidenciaModule {}
