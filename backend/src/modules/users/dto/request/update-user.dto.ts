import { OmitType, PartialType } from '@nestjs/swagger';
import { GetUserDto } from '../response/get-user.dto';

export class UpdateUserDto extends PartialType(OmitType(GetUserDto, ['id'])) {}
