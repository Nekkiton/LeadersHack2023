import { UserProfile } from '../entities/user-profile.entity';

export class ResponseUserProfileDto {
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  residency: string;
  photo: string;

  static fromEntity(userProfile: UserProfile): ResponseUserProfileDto {
    return {
      email: userProfile.user.email,
      name: userProfile.name,
      surname: userProfile.surname,
      patronymic: userProfile.patronymic,
      residency: userProfile.residency,
      photo: userProfile.photo,
    };
  }
}
