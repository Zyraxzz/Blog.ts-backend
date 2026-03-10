import { Injectable } from '@nestjs/common';
import { GetUserDTO, UserDTO } from './dtos/user.dto';
import * as argon2 from 'argon2';
import { UserAlreadyExists } from 'src/common/errors/userAlreadyExists';
import { UserRepository } from 'src/repositories/user/user.repository';
import { InvalidCredentials } from 'src/common/errors/invalidCredentials';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: UserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await this.userRepository.createUser({
      ...data,
      password: passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async get(data: GetUserDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new InvalidCredentials();
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async update(data: UserDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UserAlreadyExists();
    }

    const passwordMatch = await argon2.verify(user.password, data.password);

    if (!passwordMatch) {
      throw new InvalidCredentials();
    }
  }
}
