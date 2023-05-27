import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, Length, MaxLength } from 'class-validator';

export class Education {
  @MaxLength(1000)
  @IsString()
  @ApiProperty({ maxLength: 1000 })
  name: string;

  @MaxLength(1000)
  @IsString()
  @ApiProperty({ maxLength: 1000 })
  specialty: string;

  @Length(4, 4)
  @IsString()
  @IsNumberString()
  @ApiProperty({ minLength: 4, maxLength: 4 })
  graduationYear: string;

  static fromDb(jsonb: string): Education {
    return JSON.parse(jsonb) as Education;
  }

  static toDb(education: string): string {
    return JSON.stringify(education);
  }
}
