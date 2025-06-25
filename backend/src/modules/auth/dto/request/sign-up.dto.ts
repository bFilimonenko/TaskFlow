import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from '../../../users/dto/user.dto';

export class SignUpDto extends PickType(UserDto, ['firstName', 'lastName', 'email']) {
  @ApiProperty({
    description: 'User password',
    example: 'pass1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
