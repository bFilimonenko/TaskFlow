import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../entity/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { GetHashedPassDto } from './dto/response/get-hashed-pass.dto';
import { GetUserDto } from './dto/response/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<GetUserDto[]> {
    return await this.usersRepository.find();
  }

  async findOneByID(id: number): Promise<GetUserDto | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<GetUserDto | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async getHashedPassByEmail(email: string): Promise<GetHashedPassDto | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(user: CreateUserDto): Promise<GetUserDto> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
