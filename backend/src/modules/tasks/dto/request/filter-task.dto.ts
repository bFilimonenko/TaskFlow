import { PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { Transform, Type } from 'class-transformer';

export class FilterTaskDto extends PartialType(
  PickType(CreateTaskDto, ['deadLine', 'estimate', 'priority', 'status', 'users']),
) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  estimate?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [];
  })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  users?: number[];
}
