import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';
import { TaskDto } from '../task.dto';

export class CreateTaskDto extends PickType(TaskDto, [
  'taskName',
  'estimate',
  'deadLine',
  'priority',
  'status',
  'description',
]) {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  users: number[];
}
