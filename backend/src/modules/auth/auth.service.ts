import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RefreshToken } from '../../entity/refresh-token.entity';
import { GetUserDto } from '../users/dto/response/get-user.dto';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/request/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>) {
  }

  async signUp(userdata: SignUpDto): Promise<GetUserDto> {
    const saltRounds: number = Number(this.configService.get('SALT_ROUNDS'));
    try {
      userdata.password = await bcrypt.hash(userdata.password, saltRounds);

      return await this.usersService.create(userdata);
    } catch (err) {
      throw new Error('Error hashing password or creating user');
    }
  }

  async createAccessToken(userId: number): Promise<string | any> {
    return this.jwtService.signAsync({ id: userId }, { expiresIn: '1h' });
  }

  async createRefreshToken(userId: number): Promise<string> {
    const token: string = await this.jwtService.signAsync({ id: userId }, { expiresIn: '7d' });
    const validFrom = new Date();
    const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const refreshToken = this.refreshTokenRepository.create({
      refreshToken: token,
      validFrom,
      validUntil,
      user: {
        id: userId,
      },
    });
    await this.refreshTokenRepository.save(refreshToken);

    return token;
  }

  async login(email: string, receivedPass: string): Promise<string | any> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      bcrypt.compare(receivedPass, user.password, function(err, result: boolean) {
        if (err || !result) {
          throw new UnauthorizedException();
        }
      });

      return {
        access_token: await this.createAccessToken(user.id),
        refresh_token: await this.createRefreshToken(user.id),
      };
    } catch (err) {
      throw new Error(err);
    }
  }

}
