import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { GetUserDto } from './dto/response/get-user.dto';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: () => UnauthorizedException,
  })
  @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findAll(): Promise<GetUserDto[]> {
    return await this.usersService.findAll();
  }

  @Get('/me')
  @ApiOperation({
    summary: 'Get one user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
  findMe(@Request() req): Promise<GetUserDto | null> {
    return this.usersService.findOneByID(req.user.id);
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: number): Promise<GetUserDto | null> {
    return this.usersService.findOneByID(id);
  }

  @Post('/some')
  @ApiOperation({
    summary: 'Get many users by ids',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserDto,
    isArray: true,
  })
  @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findSome(@Body() ids: number[]): Promise<GetUserDto[]> {
    return this.usersService.findByIds(ids);
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
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by id',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
