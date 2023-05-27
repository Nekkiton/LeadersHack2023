import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { FindOptionsRelations, Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { TransactionOptions, TransactionService } from './TransactionService';

interface WithUser {
  user: User;
}

export type UserServiceOptions<T> = {
  entityName: string;
  relations: FindOptionsRelations<T>;
};

export class UserBasedService<
  Entity extends WithUser,
  CreateDTO extends DeepPartial<Entity>,
  UpdateDTO extends DeepPartial<Entity>,
> extends TransactionService<Entity> {
  constructor(cls: { new (): Entity }, repository: Repository<Entity>, private options: UserServiceOptions<Entity>) {
    super(cls, repository);
  }

  async create(user: User, dto: CreateDTO, transaction?: TransactionOptions): Promise<Entity> {
    const repository = this.getRepository(transaction);
    const where = { user } as FindOptionsWhere<Entity>;
    const alreadyExists = await repository.exist({ where });
    if (alreadyExists) {
      throw new BadRequestException(`${this.options.entityName} for specified user already exists`);
    }
    const entity = repository.create({
      ...dto,
      user,
    });
    const created = await repository.save(entity);
    return created;
  }

  async update(user: User, dto: UpdateDTO, transaction?: TransactionOptions): Promise<Entity> {
    const repository = this.getRepository(transaction);
    const current = await this.findOne(user, transaction);
    if (!current) {
      throw new NotFoundException(`${this.options.entityName} have not created yet. Completed sign-up`);
    }
    const entity = repository.create({
      ...current,
      ...dto,
    });
    const updated = await repository.save(entity);
    return updated;
  }

  async findOne(user: User, transaction?: TransactionOptions): Promise<Entity | null> {
    const repository = this.getRepository(transaction);
    const where = { user } as FindOptionsWhere<Entity>;
    return repository.findOne({ where, relations: this.options.relations });
  }
}
