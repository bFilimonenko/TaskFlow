import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from '../users/dto/response/get-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { SignUpDto } from './dto/request/sign-up.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signup')
  @ApiOperation({
    summary: 'signup',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
  })
  @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
  signUp(@Body() signUpDto: SignUpDto): Promise<GetUserDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  login(@Body() { email, password }: LoginDto): Promise<string | any> {
    return this.authService.login(email, password);
  }
}
