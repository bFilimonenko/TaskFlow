import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param, Patch,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { GetUserDto } from './dto/response/get-user.dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
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
  @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
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
  @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
  findOne(@Param('id') id: number): Promise<GetUserDto | null> {
    return this.appService.findOneByID(id);
  }

  @Patch(':id')
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
