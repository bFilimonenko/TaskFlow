import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RefreshToken } from '../../entity/refresh-token.entity';
import { UsersService } from '../users/users.service';
import { LogoutDto } from './dto/request/logout.dto';
import { SignUpDto } from './dto/request/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signUp(userdata: SignUpDto): Promise<any> {
    const saltRounds: number = Number(this.configService.get('SALT_ROUNDS'));
    try {
      userdata.password = await bcrypt.hash(userdata.password, saltRounds);

      const newUser = await this.usersService.create(userdata);

      await this.usersService.changeStatus(newUser.id, true);

      return {
        accessToken: await this.createAccessToken(newUser.id),
        refreshToken: await this.createRefreshToken(newUser.id),
      };
    } catch (err) {
      throw new Error('Error hashing password or creating user');
    }
  }

  async createAccessToken(userId: number): Promise<string | any> {
    const user = await this.usersService.findOneByID(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    return this.jwtService.signAsync(payload, { expiresIn: '1h' });
  }

  async createRefreshToken(userId: number): Promise<string> {
    await this.refreshTokenRepository.delete({ user: { id: userId } });

    const token: string = await this.jwtService.signAsync(
      { id: userId },
      {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
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

  async login(email: string, receivedPass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      const isMatch = await bcrypt.compare(receivedPass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
      }

      await this.usersService.changeStatus(user.id, true);
      return {
        accessToken: await this.createAccessToken(user.id),
        refreshToken: await this.createRefreshToken(user.id),
      };
    } catch (err) {
      throw err;
    }
  }

  async logout({ id, token }: LogoutDto): Promise<void> {
    await this.usersService.changeStatus(id, false);
    await this.refreshTokenRepository.delete(token);
  }

  async refreshTokens(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_SECRET'),
      });
      const userId = payload.id;

      const tokenRecord: RefreshToken | null = await this.refreshTokenRepository.findOneBy({
        refreshToken,
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      if (tokenRecord?.validUntil < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const accessToken = await this.createAccessToken(userId);
      const newRefreshToken = await this.createRefreshToken(userId);

      return {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw err;
    }
  }
}
