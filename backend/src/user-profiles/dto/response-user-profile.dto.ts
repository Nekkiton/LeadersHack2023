import { UserProfile } from '../entities/user-profile.entity';

export class ResponseUserProfileDto {
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  citizenship: string;
  location: string;
  phone: string;
  photo: string;

  static fromEntity(userProfile: UserProfile): ResponseUserProfileDto {
    return {
      email: userProfile.user.email,
      name: userProfile.name,
      surname: userProfile.surname,
      patronymic: userProfile.patronymic,
      citizenship: userProfile.citizenship,
      location: userProfile.location,
      phone: userProfile.phone,
      photo: userProfile.photo,
    };
  }
}
