import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificacionOrmEntity } from './infrastructure/persistence/notificacion.orm-entity';
import { ProgramaFormacionOrmEntity } from './infrastructure/persistence/programa-formacion.orm-entity';
import { TipoFormacionOrmEntity } from './infrastructure/persistence/tipo-formacion.orm-entity';
import { TelegramFormEstadoOrmEntity } from './infrastructure/persistence/telegram-form-estado.orm-entity';
import { TransaccionFinancieraOrmEntity } from './infrastructure/persistence/transaccion-financiera.orm-entity';

import { NotificacionTypeOrmRepository } from './infrastructure/persistence/notificacion-typeorm.repository';
import { ProgramaFormacionTypeOrmRepository } from './infrastructure/persistence/programa-formacion-typeorm.repository';
import { TipoFormacionTypeOrmRepository } from './infrastructure/persistence/tipo-formacion-typeorm.repository';
import { TelegramFormEstadoTypeOrmRepository } from './infrastructure/persistence/telegram-form-estado-typeorm.repository';
import { TransaccionFinancieraTypeOrmRepository } from './infrastructure/persistence/transaccion-financiera-typeorm.repository';

import { NOTIFICACION_REPOSITORY } from './domain/ports/notificacion.repository.port';
import { PROGRAMA_FORMACION_REPOSITORY } from './domain/ports/programa-formacion.repository.port';
import { TIPO_FORMACION_REPOSITORY } from './domain/ports/tipo-formacion.repository.port';
import { TELEGRAM_FORM_ESTADO_REPOSITORY } from './domain/ports/telegram-form-estado.repository.port';
import { TRANSACCION_FINANCIERA_REPOSITORY } from './domain/ports/transaccion-financiera.repository.port';

import { CreateNotificacionUseCase } from './application/use-cases/create-notificacion.use-case';
import { GetNotificacionUseCase } from './application/use-cases/get-notificacion.use-case';
import { CreateProgramaFormacionUseCase } from './application/use-cases/create-programa-formacion.use-case';
import { GetProgramaFormacionUseCase } from './application/use-cases/get-programa-formacion.use-case';
import { CreateTipoFormacionUseCase } from './application/use-cases/create-tipo-formacion.use-case';
import { GetTipoFormacionUseCase } from './application/use-cases/get-tipo-formacion.use-case';
import { CreateTransaccionFinancieraUseCase } from './application/use-cases/create-transaccion-financiera.use-case';
import { GetTransaccionFinancieraUseCase } from './application/use-cases/get-transaccion-financiera.use-case';
import { SaveTelegramFormEstadoUseCase } from './application/use-cases/save-telegram-form-estado.use-case';
import { GetTelegramFormEstadoUseCase } from './application/use-cases/get-telegram-form-estado.use-case';

import { NotificacionController } from './infrastructure/http/controllers/notificacion.controller';
import { ProgramaFormacionController } from './infrastructure/http/controllers/programa-formacion.controller';
import { TipoFormacionController } from './infrastructure/http/controllers/tipo-formacion.controller';
import { TransaccionFinancieraController } from './infrastructure/http/controllers/transaccion-financiera.controller';
import { TelegramFormEstadoController } from './infrastructure/http/controllers/telegram-form-estado.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificacionOrmEntity,
      ProgramaFormacionOrmEntity,
      TipoFormacionOrmEntity,
      TelegramFormEstadoOrmEntity,
      TransaccionFinancieraOrmEntity,
    ]),
  ],
  controllers: [
    NotificacionController,
    ProgramaFormacionController,
    TipoFormacionController,
    TransaccionFinancieraController,
    TelegramFormEstadoController,
  ],
  providers: [
    CreateNotificacionUseCase,
    GetNotificacionUseCase,
    CreateProgramaFormacionUseCase,
    GetProgramaFormacionUseCase,
    CreateTipoFormacionUseCase,
    GetTipoFormacionUseCase,
    CreateTransaccionFinancieraUseCase,
    GetTransaccionFinancieraUseCase,
    SaveTelegramFormEstadoUseCase,
    GetTelegramFormEstadoUseCase,
    { provide: NOTIFICACION_REPOSITORY, useClass: NotificacionTypeOrmRepository },
    { provide: PROGRAMA_FORMACION_REPOSITORY, useClass: ProgramaFormacionTypeOrmRepository },
    { provide: TIPO_FORMACION_REPOSITORY, useClass: TipoFormacionTypeOrmRepository },
    { provide: TELEGRAM_FORM_ESTADO_REPOSITORY, useClass: TelegramFormEstadoTypeOrmRepository },
    { provide: TRANSACCION_FINANCIERA_REPOSITORY, useClass: TransaccionFinancieraTypeOrmRepository },
  ],
})
export class AdministracionModule {}