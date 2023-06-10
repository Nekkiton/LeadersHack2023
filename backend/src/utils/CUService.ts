import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { TransactionOptions, TransactionService } from './TransactionService';

export type CUServiceOptions<T, IdentityKey> = {
  identityKeys: IdentityKey[];
  entityName: string;
  relations?: FindOptionsRelations<T>;
};

export class CUService<
  Entity extends { id: string },
  IdentityKey extends keyof Entity,
  CreateDTO extends DeepPartial<Entity>,
  UpdateDTO extends DeepPartial<Entity>,
> extends TransactionService<Entity> {
  constructor(
    cls: { new (): Entity },
    repository: Repository<Entity>,
    private options: CUServiceOptions<Entity, IdentityKey>,
  ) {
    super(cls, repository);
  }

  async create(
    identity: { [k in IdentityKey]: unknown },
    dto: CreateDTO,
    transaction?: TransactionOptions,
  ): Promise<Entity> {
    const repository = this.getRepository(transaction);
    const where = identity as FindOptionsWhere<Entity>;
    const alreadyExists = await repository.exist({ where });
    if (alreadyExists) {
      throw new BadRequestException(`${this.options.entityName} already exists`);
    }
    const entity = repository.create({
      ...identity,
      ...dto,
    });
    const created = await repository.save(entity);
    return created;
  }

  async update(
    identity: { [k in IdentityKey]: unknown },
    dto: UpdateDTO,
    transaction?: TransactionOptions,
  ): Promise<Entity> {
    const repository = this.getRepository(transaction);
    const current = await this.findOne(identity, transaction);
    if (!current) {
      const properties = Object.keys(identity).join(', ');
      throw new NotFoundException(`${this.options.entityName} with specified ${properties} not found`);
    }
    const entity = repository.create({
      ...current,
      ...dto,
    });
    const updated = await repository.save(entity);
    return updated;
  }

  async upsert(
    identity: { [k in IdentityKey]: unknown },
    dto: CreateDTO | UpdateDTO,
    transaction?: TransactionOptions,
  ): Promise<Entity> {
    const exists = await this.checkExists(identity, transaction);
    if (exists) {
      return this.update(identity, dto as UpdateDTO, transaction);
    }
    return this.create(identity, dto as CreateDTO, transaction);
  }

  async findOne(condition: { [k in IdentityKey]: unknown }, transaction?: TransactionOptions): Promise<Entity> {
    const repository = this.getRepository(transaction);
    const where = condition as FindOptionsWhere<Entity>;
    const entity = await repository.findOne({ where, relations: this.options.relations });
    if (!entity) {
      const properties = Object.keys(condition).join(', ');
      throw new NotFoundException(`${this.options.entityName} with specified ${properties} not found`);
    }
    return entity;
  }

  async findAll(condition?: { [k in keyof Entity]: unknown }, transaction?: TransactionOptions): Promise<Entity[]> {
    const repository = this.getRepository(transaction);
    const where = condition as FindOptionsWhere<Entity>;
    return repository.find({ where, relations: this.options.relations });
  }

  async findOneById(id: string, transaction?: TransactionOptions): Promise<Entity> {
    const repository = this.getRepository(transaction);
    const where = { id } as FindOptionsWhere<Entity>;
    const entity = await repository.findOne({ where, relations: this.options.relations });
    if (!entity) {
      throw new NotFoundException(`${this.options.entityName} with id="${id}" not found`);
    }
    return entity;
  }

  checkExists(condition?: { [key in IdentityKey]: unknown }, transaction?: TransactionOptions): Promise<boolean> {
    const repository = this.getRepository(transaction);
    const where = condition as FindOptionsWhere<Entity>;
    return repository.exist({ where });
  }
}
