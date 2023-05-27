import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../entities/user-profile.entity';
import { Role } from 'src/auth/roles/role.enum';

export class ResponseUserProfileDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  patronymic: string;

  @ApiProperty({ format: 'date' })
  birthday: string;

  @ApiProperty()
  citizenship: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ required: false })
  photo: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Role })
  role: Role;

  static fromEntity(userProfile: UserProfile): ResponseUserProfileDto {
    return {
      name: userProfile.name,
      surname: userProfile.surname,
      patronymic: userProfile.patronymic,
      citizenship: userProfile.citizenship,
      location: userProfile.location,
      phone: userProfile.phone,
      photo: userProfile.photo,
      birthday: userProfile.birthday,
      email: userProfile.user.email,
      role: userProfile.user.role,
    };
  }
}
