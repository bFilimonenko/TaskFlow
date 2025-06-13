import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class UpdateUserDto extends PickType(UserDto, ['age', 'city', 'firstName', 'lastName']) {
  @ApiProperty({
    description: 'New user age',
    required: false,
  })
  age: number;

  @ApiProperty({
    description: 'New user city',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'New user first name',
    required: false,
  })
  firstName: string;

  @ApiProperty({
    description: 'New user last name',
    required: false,
  })
  lastName: string;
}
