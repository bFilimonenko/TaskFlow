import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { GetUserDto } from './dto/response/get-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly appService: UsersService) {
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
    isArray: true,
  })
  async findAll(): Promise<GetUserDto[]> {
    return await this.appService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
  })
  findOne(@Param('id') id: number): Promise<GetUserDto | null> {
    return this.appService.findOneByID(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto | null> {
    return this.appService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.appService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by id',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.appService.remove(id);
  }
}
