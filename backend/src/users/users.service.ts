import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TransactionOptions } from 'src/utils/TransactionService';
import { Role } from 'src/auth/roles/role.enum';
import { CUService } from 'src/utils/CUService';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { promisify } from 'util';
import { randomBytes } from 'crypto';

const randomBytesAsync = promisify(randomBytes);

@Injectable()
export class UsersService extends CUService<User, 'email', CreateUserDto, UpdateUserDto> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super(User, userRepository, { entityName: 'User', identityKeys: ['email'] });
  }

  async register(
    dto: RegisterUserDto,
    role: Role,
    transaction?: TransactionOptions,
  ): Promise<{ user: User; password: string }> {
    let passwordHash: string;
    let password: string;
    if (dto.password) {
      password = dto.password;
      passwordHash = await hash(dto.password, this.configService.get('jwt.saltRounds'));
    } else {
      const passwordLength = this.configService.get('application.generatedPasswordLength');
      password = (await randomBytesAsync(passwordLength)).toString('base64url');
      passwordHash = await hash(password, this.configService.get('jwt.saltRounds'));
    }
    const user = await this.create(
      {
        email: dto.email,
      },
      {
        email: dto.email,
        role,
        passwordHash,
      },
      transaction,
    );
    return { user, password };
  }

  async promoteToCandidate(user: User, transaction?: TransactionOptions): Promise<User> {
    if (user.role !== Role.NOBODY) {
      throw new ForbiddenException();
    }
    return this.update({ email: user.email }, { role: Role.CANDIDATE }, transaction);
  }
}
