import { UserDto } from './user.dto';

export class UserWithPasswordDto extends UserDto {
  password: string;
}
