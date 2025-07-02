import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Tasks } from '../../entity/tasks.entity';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private tasksRepository: Repository<Tasks>,
    private userService: UsersService,
  ) {}

  async findAll(): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.find({ relations: ['users'] });
    return tasks.map((task) => ({
      ...task,
      users: task.users.map((user) => user.id),
    }));
  }

  async findOneById(@Param('id') id: number): Promise<TaskDto | null> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!task) return null;

    return {
      ...task,
      users: task.users.map((user) => user.id),
    };
  }

  async create(taskDto: CreateTaskDto): Promise<TaskDto> {
    const users = await this.userService.findByIds(taskDto.users);
    const task = this.tasksRepository.create({
      ...taskDto,
      users,
    });
    const savedTask = await this.tasksRepository.save(task);

    return {
      ...savedTask,
      users: savedTask.users.map((user) => user.id),
    };
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
