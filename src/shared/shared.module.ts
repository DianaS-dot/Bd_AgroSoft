import { Module, Global } from '@nestjs/common';
import { TypeOrmTransactionManager } from './infrastructure/typeorm-transaction-manager';
import { TRANSACTION_MANAGER } from './ports/transaction-manager.port';

@Global()
@Module({
  providers: [{ provide: TRANSACTION_MANAGER, useClass: TypeOrmTransactionManager }],
  exports: [TRANSACTION_MANAGER],
})
export class SharedModule {}