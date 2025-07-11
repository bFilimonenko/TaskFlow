import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from '../../entity/projects.entity';
import { GetTaskDto } from '../tasks/dto/response/get-task.dto';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { UpdateProjectDto } from './dto/request/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Projects) private projectsRepository: Repository<Projects>) {}

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

    return project.tasks.map((task) => ({
      ...task,
      users: task.users.map((user) => user.id),
    }));
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
