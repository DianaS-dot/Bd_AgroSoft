import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateEmailCodeUseCase } from './application/use_cases/create-email-code.use-case';
import { GetEmailCodeUseCase } from './application/use_cases/get-email-code.use-case';
import { EMAIL_CODE_REPOSITORY } from './domain/email-code-repository.port';
import { EmailCodeTypeOrmRepository } from './infrastructure/persistence/email-code-typeorm.repository';
import { EmailCodeOrmEntity } from './infrastructure/persistence/email-code.orm-entity';
import { EmailCodeController } from './infrastructure/http/email-code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmailCodeOrmEntity])],
  controllers: [EmailCodeController],
  providers: [
    { provide: EMAIL_CODE_REPOSITORY, useClass: EmailCodeTypeOrmRepository },
    CreateEmailCodeUseCase,
    GetEmailCodeUseCase,
  ],
  exports: [EMAIL_CODE_REPOSITORY, CreateEmailCodeUseCase, GetEmailCodeUseCase],
})
export class EmailCodesModule {}
