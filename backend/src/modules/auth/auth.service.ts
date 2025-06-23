import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from '../users/dto/response/get-user.dto';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/request/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private configService: ConfigService) {
  }

  async signUp(userdata: SignUpDto): Promise<GetUserDto> {
    const saltRounds: number = Number(this.configService.get('SALT_ROUNDS'));
    try {
      userdata.password = await bcrypt.hash(userdata.password, saltRounds);

      return await this.usersService.create(userdata);
    } catch (err) {
      console.error(err);
      throw new Error('Error hashing password or creating user');
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const user = await this.usersService.getHashedPassByEmail(email);

      if (!user) {
        throw new Error('There is no such user');
      }

      bcrypt.compare(password, user.password, function(err, result: boolean) {
        if (err) {
          console.error(err);
          return;
        }

        console.log(result ? 'Password is correct!' : 'Password is incorrect!');
        return result;
      });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
