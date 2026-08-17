import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaOrmEntity } from './infrastructure/persistence/reserva.orm-entity';
import { ReservaTypeOrmRepository } from './infrastructure/persistence/reserva-typeorm.repository';
import { RESERVA_REPOSITORY } from './domain/ports/reserva-repository.port';
import { CreateReservaUseCase } from './application/use-cases/create-reserva.use-case';
import { GetReservaUseCase } from './application/use-cases/get-reserva.use-case';
import { ReservaController } from './infrastructure/http/controllers/reserva.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservaOrmEntity])
  ],
  controllers: [ReservaController],
  providers: [
    CreateReservaUseCase,
    GetReservaUseCase,
    {
      provide: RESERVA_REPOSITORY,
      useClass: ReservaTypeOrmRepository,
    },
  ],
  exports: [CreateReservaUseCase, GetReservaUseCase],
})
export class ReservaModule {}
