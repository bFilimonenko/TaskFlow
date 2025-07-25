import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from '../../auth/role.enum';

export class UserDto {
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Dnipro',
    required: false,
  })
  @IsString()
  @Expose()
  city?: string;

  @ApiProperty({
    description: 'User Age',
    example: 25,
    required: false,
  })
  @IsNumber()
  @Expose()
  age?: number;

  @ApiProperty({
    description: 'Is user activated',
    example: false,
    required: false,
  })
  @IsBoolean()
  @Expose()
  isActive?: boolean = false;

  @ApiProperty({
    description: 'User role',
    example: 'admin',
    required: false,
    enum: Role,
  })
  @IsEnum(Role)
  @Expose()
  role?: Role = Role.USER;
}
