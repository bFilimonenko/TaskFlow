import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { FilterTaskDto } from '../tasks/dto/request/filter-task.dto';
import { GetTaskDto } from '../tasks/dto/response/get-task.dto';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { UpdateProjectDto } from './dto/request/update-project.dto';
import { ProjectsService } from './projects.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all projects',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => ProjectDto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll(): Promise<ProjectDto[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a project by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => ProjectDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: number): Promise<ProjectDto | null> {
    return this.projectsService.getOneById(id);
  }

  @Get(':id/tasks')
  @ApiOperation({
    summary: 'Get project tasks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetTaskDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findProjectTasks(@Param('id') id: number): Promise<GetTaskDto[] | null> {
    return this.projectsService.getTasksById(id);
  }

  @Get(':id/tasks/filter')
  @ApiOperation({
    summary: 'Task filter',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetTaskDto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getFilteredTasks(
    @Param('id') projectId: number,
    @Query() filters: FilterTaskDto,
  ): Promise<GetTaskDto[]> {
    return this.projectsService.findTasksWithFilters(projectId, filters);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a project',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => ProjectDto,
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return this.projectsService.create(createProjectDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a project',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => ProjectDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a project',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number): Promise<void> {
    return this.projectsService.remove(id);
  }
}
