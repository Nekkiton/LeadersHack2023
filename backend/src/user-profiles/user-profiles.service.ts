import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { ReferralsService } from 'src/referrals/referrals.service';
import { TransactionOptions, TransactionService } from 'src/components/TransactionService';

@Injectable()
export class UserProfilesService extends TransactionService<UserProfile> {
  constructor(
    @InjectRepository(UserProfile)
    userProfileRepository: Repository<UserProfile>,
    private referralService: ReferralsService,
  ) {
    super(UserProfile, userProfileRepository);
  }

  async createUserProfile(dto: CreateUserProfileDto, transaction?: TransactionOptions): Promise<UserProfile> {
    const repository = this.getRepository(transaction);
    const referral = await this.referralService.findOne(dto.referralId, transaction);
    if (!referral) {
      throw new ForbiddenException();
    }
    const alreadyExist = await repository.exist({ where: { user: referral.user } });
    if (alreadyExist) {
      throw new BadRequestException(`User profile for specified user already exists`);
    }
    const userProfile = repository.create({
      ...dto,
      user: referral.user,
    });
    const [created] = await repository.save([userProfile]);
    return created;
  }
}
