import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { TaskDto } from '../task.dto';

export class CreateTaskDto extends PickType(TaskDto, [
  'taskName',
  'estimate',
  'deadLine',
  'priority',
  'description',
]) {
  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  users: number[];
}
