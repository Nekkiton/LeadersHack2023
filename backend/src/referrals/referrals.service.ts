import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { Referral } from './entities/referral.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { TransactionOptions, TransactionService } from 'src/components/TransactionService';

const randomBytesAsync = promisify(randomBytes);

@Injectable()
export class ReferralsService extends TransactionService<Referral> {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Referral)
    referralRepository: Repository<Referral>,
  ) {
    super(Referral, referralRepository);
  }

  async createReferral(user: User, transaction?: TransactionOptions): Promise<Referral> {
    const repository = this.getRepository(transaction);
    const referralIdLength = this.configService.get('application.referralIdLength');
    const referralId = (await randomBytesAsync(referralIdLength)).toString('base64url');
    const referral = repository.create({ referralId, user });
    const [created] = await repository.save([referral]);
    return created;
  }

  findOne(referralId: string, transaction?: TransactionOptions): Promise<Referral | null> {
    const repository = this.getRepository(transaction);
    return repository.findOne({ where: { referralId }, relations: { user: true } });
  }
}
