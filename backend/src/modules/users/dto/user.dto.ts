import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail } from 'class-validator';
import { User } from '../../../entity/user.entity';

export class UserDto implements User {
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'pass1234',
  })
  password: string;

  @ApiProperty({
    description: 'User city',
    example: 'Dnipro',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'User Age',
    example: 25,
    required: false,
  })
  age?: number;

  @ApiProperty({
    description: 'Is user activated',
    example: false,
    required: false,
  })
  @IsBoolean()
  isActive?: boolean = true;
}
