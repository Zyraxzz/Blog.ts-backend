import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentials } from 'src/common/errors/invalidCredentials';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as argon2 from 'argon2';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async auth(data: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const passwordMatch = await argon2.verify(user.password, data.password);

    if (!passwordMatch) {
      throw new InvalidCredentials();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
