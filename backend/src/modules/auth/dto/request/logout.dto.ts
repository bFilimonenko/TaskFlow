import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { RefreshTokenDto } from './refresh-token.dto';

export class LogoutDto extends RefreshTokenDto {
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  @IsNumber()
  @Expose()
  id: number;
}
