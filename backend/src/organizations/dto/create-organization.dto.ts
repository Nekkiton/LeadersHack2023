import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
  @MaxLength(1000)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 1000 })
  logo: string;

  @MaxLength(255)
  @IsString()
  @ApiPropertyOptional({ maxLength: 255 })
  name: string;

  @MaxLength(1000)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 1000 })
  address: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  phone: string;

  @MaxLength(255)
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ maxLength: 255 })
  email: string;
}
