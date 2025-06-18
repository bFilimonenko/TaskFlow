import { PickType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class GetHashedPassDto extends PickType(UserDto, ['password']) {
}