import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { GetTaskDto } from '../tasks/dto/response/get-task.dto';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { UpdateProjectDto } from './dto/request/update-project.dto';
import { ProjectsService } from './projects.service';

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
  findProjectTasks(@Param('id') id: number): Promise<GetTaskDto[] | null> {
    return this.projectsService.getTasksById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a project',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => ProjectDto,
  })
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
  update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a project',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.projectsService.remove(id);
  }
}
