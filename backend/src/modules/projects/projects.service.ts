import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from '../../entity/projects.entity';
import { Tasks } from '../../entity/tasks.entity';
import { FilterTaskDto } from '../tasks/dto/request/filter-task.dto';
import { GetTaskDto } from '../tasks/dto/response/get-task.dto';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { UpdateProjectDto } from './dto/request/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects) private projectsRepository: Repository<Projects>,
    @InjectRepository(Tasks) private tasksRepository: Repository<Tasks>,
  ) {}

  async findAll(): Promise<ProjectDto[]> {
    return await this.projectsRepository.find({
      relations: ['tasks'],
    });
  }

  async findOneById(@Param('id') id: number): Promise<ProjectDto | null> {
    return await this.projectsRepository.findOneBy({ id });
  }

  async getOneById(id: number): Promise<ProjectDto | null> {
    return await this.projectsRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async getTasksById(id: number): Promise<GetTaskDto[] | null> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['tasks', 'tasks.users'],
    });

    if (!project) {
      throw new NotFoundException(`Project not found`);
    }

    return project.tasks.map((task) => task);
  }

  async findTasksWithFilters(projectId: number, query: FilterTaskDto): Promise<GetTaskDto[]> {
    const { deadLine, estimate, priority, status, users } = query;

    const qb = this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.users', 'user')
      .leftJoinAndSelect('task.project', 'project')
      .where('project.id = :projectId', { projectId });

    if (deadLine) {
      qb.andWhere('DATE(task.deadLine) = :deadLine', { deadLine });
    }

    if (estimate) {
      qb.andWhere('task.estimate = :estimate', { estimate });
    }

    if (priority) {
      qb.andWhere('task.priority = :priority', { priority });
    }

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }

    if (users && users.length > 0) {
      qb.andWhere('user.id IN (:...users)', { users });
    }

    return await qb.getMany();
  }

  async create(project: CreateProjectDto): Promise<ProjectDto> {
    return await this.projectsRepository.save(project);
  }

  async update(id: number, project: UpdateProjectDto): Promise<ProjectDto> {
    const existing = await this.projectsRepository.preload({
      id,
      ...project,
    });

    if (!existing) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return this.projectsRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
