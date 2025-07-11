import { OmitType, PartialType } from '@nestjs/swagger';
import { TaskDto } from '../task.dto';

export class UpdateTaskDto extends PartialType(OmitType(TaskDto, ['id', 'projectId'])) {}
