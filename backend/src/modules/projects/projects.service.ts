import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Projects } from '../../entity/projects.entity';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { UpdateProjectDto } from './dto/request/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Projects) private projectsRepository: Repository<Projects>) {}

  async findAll(): Promise<ProjectDto[]> {
    return await this.projectsRepository.find();
  }

  async findOneById(@Param('id') id: number): Promise<ProjectDto | null> {
    return await this.projectsRepository.findOneBy({ id });
  }

  async create(project: CreateProjectDto): Promise<ProjectDto> {
    return await this.projectsRepository.save(project);
  }

  async update(id: number, project: UpdateProjectDto): Promise<UpdateResult> {
    return this.projectsRepository.update(id, project);
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
