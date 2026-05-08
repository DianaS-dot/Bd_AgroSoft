import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa esto para usar TypeORM
import { CultivoBaseService } from './cultivo_base.service';
import { CultivoBaseController } from './cultivo_base.controller';
import { CultivoBase } from './entities/cultivo_base.entity'; // Importa tu entidad de CultivoBase

@Module({
  imports: [TypeOrmModule.forFeature([CultivoBase])],
  controllers: [CultivoBaseController],
  providers: [CultivoBaseService],
  exports: [TypeOrmModule], // Exporta el módulo de TypeORM para que otros módulos puedan usarlo
})
export class CultivoBaseModule {}
