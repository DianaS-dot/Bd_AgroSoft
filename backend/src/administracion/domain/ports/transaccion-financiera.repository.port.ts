import { TransaccionFinanciera } from '../entities/transaccion-financiera.entity';

export interface TransaccionFinancieraRepository {
  save(transaccion: TransaccionFinanciera): Promise<TransaccionFinanciera>;
  findAll(): Promise<TransaccionFinanciera[]>;
  findById(id: number): Promise<TransaccionFinanciera | null>;
}

export const TRANSACCION_FINANCIERA_REPOSITORY = Symbol('TRANSACCION_FINANCIERA_REPOSITORY');