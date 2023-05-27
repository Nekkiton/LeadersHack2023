import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { TransactionOptions, TransactionService } from 'src/components/TransactionService';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfilesService extends TransactionService<UserProfile> {
  constructor(
    @InjectRepository(UserProfile)
    userProfileRepository: Repository<UserProfile>,
  ) {
    super(UserProfile, userProfileRepository);
  }

  async createUserProfile(
    user: User,
    dto: CreateUserProfileDto,
    transaction?: TransactionOptions,
  ): Promise<UserProfile> {
    const repository = this.getRepository(transaction);
    const alreadyExist = await repository.exist({ where: { user: user } });
    if (alreadyExist) {
      throw new BadRequestException(`User profile for specified user already exists`);
    }
    const userProfile = repository.create({
      ...dto,
      user,
    });
    const created = await repository.save(userProfile);
    return created;
  }

  async updateUserProfile(
    user: User,
    dto: UpdateUserProfileDto,
    transaction?: TransactionOptions,
  ): Promise<UserProfile> {
    const repository = this.getRepository(transaction);
    const profile = await this.findOne(user, transaction);
    if (!profile) {
      throw new NotFoundException('User profile have not created yet. Completed sign-up');
    }
    const userProfile = repository.create({
      ...profile,
      ...dto,
    });
    const updated = await repository.save(userProfile);
    return updated;
  }

  async findOne(user: User, transaction?: TransactionOptions): Promise<UserProfile | null> {
    const repository = this.getRepository(transaction);
    return repository.findOne({ where: { user }, relations: { user: true } });
  }
}
