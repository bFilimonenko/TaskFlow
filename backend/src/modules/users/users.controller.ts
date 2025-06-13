import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => [UserDto],
  })
  async findAll(): Promise<UserDto[]> {
    return await this.appService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => UserDto,
  })
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => UserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => UserDto,
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by id',
  })
  remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
}
