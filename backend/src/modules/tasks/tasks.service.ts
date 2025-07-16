import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Tasks } from '../../entity/tasks.entity';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { GetTaskDto } from './dto/response/get-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private tasksRepository: Repository<Tasks>,
    private userService: UsersService,
    private projectService: ProjectsService,
  ) {}

  async findAll(): Promise<GetTaskDto[]> {
    return await this.tasksRepository.find({ relations: ['users'] });
  }

  async findOneById(@Param('id') id: number): Promise<GetTaskDto | null> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(projectId: number, taskDto: CreateTaskDto): Promise<GetTaskDto> {
    const project = await this.projectService.findOneById(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const users = await this.userService.findByIds(taskDto.users);
    const task = this.tasksRepository.create({
      ...taskDto,
      project,
      users,
    });

    return await this.tasksRepository.save(task);
  }

  async update(id: number, taskDto: UpdateTaskDto): Promise<UpdateResult> {
    const { users, ...otherFields } = taskDto;

    let updateResult: UpdateResult;
    if (Object.keys(otherFields).length > 0) {
      updateResult = await this.tasksRepository.update(id, otherFields);
    } else {
      updateResult = { affected: 0, raw: null } as UpdateResult;
    }

    if (users) {
      const userEntities = await this.userService.findByIds(users);

      const currentUsers = await this.tasksRepository
        .createQueryBuilder()
        .relation(Tasks, 'users')
        .of(id)
        .loadMany();

      await this.tasksRepository
        .createQueryBuilder()
        .relation(Tasks, 'users')
        .of(id)
        .addAndRemove(userEntities, currentUsers);
    }

    return updateResult;
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
