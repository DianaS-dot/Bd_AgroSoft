export const TRANSACTION_MANAGER = Symbol('TRANSACTION_MANAGER');

export interface TransactionManagerPort {
  ejecutarEnTransaccion<T>(fn: (manager: unknown) => Promise<T>): Promise<T>;
}