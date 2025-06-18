import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from '../users/dto/response/get-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { SignUpDto } from './dto/request/sign-up.dto';

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
  login(@Body() { email, password }: LoginDto): Promise<void> {
    return this.authService.login(email, password);
  }
}
