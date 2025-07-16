import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from '../users/dto/response/get-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { LogoutDto } from './dto/request/logout.dto';
import { RefreshTokenDto } from './dto/request/refresh-token.dto';
import { SignUpDto } from './dto/request/sign-up.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'signup',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => GetUserDto,
  })
  // @SerializeOptions({ type: GetUserDto, excludeExtraneousValues: true })
  signUp(@Body() signUpDto: SignUpDto): Promise<string | any> {
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

  @Post('logout')
  @ApiOperation({
    summary: 'Logout',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto.refreshToken);
  }

  @Post('refresh')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New tokens returned',
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.token);
  }
}
