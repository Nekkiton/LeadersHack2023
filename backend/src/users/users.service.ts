import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TransactionOptions, TransactionService } from 'src/components/TransactionService';
import { Role } from 'src/auth/roles/role.enum';

@Injectable()
export class UsersService extends TransactionService<User> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super(User, userRepository);
  }

  async createUser(dto: CreateUserDto, transaction?: TransactionOptions): Promise<User> {
    const repository = this.getRepository(transaction);
    const alreadyExist = await repository.exist({ where: { email: dto.email } });
    if (alreadyExist) {
      throw new BadRequestException('User with specified email already exists');
    }
    const user = repository.create(dto);
    user.passwordHash = await hash(dto.password, this.configService.get('jwt.saltRounds'));
    const [created] = await repository.save([user]);
    return created;
  }

  findOne(email: string, transaction?: TransactionOptions): Promise<User | null> {
    const repository = this.getRepository(transaction);
    return repository.findOneBy({ email });
  }

  async promoteToCandidate(user: User, transaction?: TransactionOptions): Promise<User> {
    const repository = this.getRepository(transaction);
    if (user.role !== Role.NOBODY) {
      throw new ForbiddenException();
    }
    user.role = Role.CANDIDATE;
    const [updated] = await repository.save([user]);
    return updated;
  }
}
