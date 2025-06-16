import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from '../../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserDto | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
