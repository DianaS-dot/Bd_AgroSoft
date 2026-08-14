import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import type { TransactionManagerPort } from '../ports/transaction-manager.port';

@Injectable()
export class TypeOrmTransactionManager implements TransactionManagerPort {
  constructor(private readonly dataSource: DataSource) {}

  async ejecutarEnTransaccion<T>(fn: (manager: unknown) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async (entityManager) => {
      return fn(entityManager);
    });
  }
}