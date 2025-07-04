import { OmitType, PartialType } from '@nestjs/swagger';
import { ProjectDto } from '../project.dto';

export class UpdateProjectDto extends PartialType(OmitType(ProjectDto, ['id'])) {}
