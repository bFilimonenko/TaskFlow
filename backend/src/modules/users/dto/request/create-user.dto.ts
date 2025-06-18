import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class CreateUserDto extends PickType(UserDto, ['firstName', 'lastName', 'email']) {
  @ApiProperty({
    description: 'User password',
    example: 'pass1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
