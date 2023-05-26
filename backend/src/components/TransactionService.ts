import { EntityManager, Repository } from 'typeorm';

export type TransactionOptions = { entityManager: EntityManager };

export class TransactionService<T> {
  constructor(private cls: { new (): T }, private repository: Repository<T>) {}

  protected getRepository(transaction?: TransactionOptions) {
    const entityManager = transaction?.entityManager;
    return entityManager ? entityManager.getRepository(this.cls) : this.repository;
  }
}
