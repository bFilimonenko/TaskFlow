import { ApiProperty } from '@nestjs/swagger';
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
    description: 'User city',
    example: 'Dnipro',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'User Age',
    example: 25,
  })
  age: number;

  @ApiProperty({
    description: 'Is user activated',
    example: false,
    required: false,
  })
  isActive?: boolean = true;
}
