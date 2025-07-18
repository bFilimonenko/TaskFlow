import { PickType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class UserRoleDto extends PickType(UserDto, ['role']) {}
