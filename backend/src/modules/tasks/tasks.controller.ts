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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => TaskDto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => TaskDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: number): Promise<TaskDto | null> {
    return this.tasksService.findOneById(id);
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Create a task',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => TaskDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  createTask(
    @Param('id') projectId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.create(projectId, createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => TaskDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<UpdateResult> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
