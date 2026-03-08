import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import * as argon2 from 'argon2';
import { UserAlreadyExists } from 'src/common/errors/userAlreadyExists';
import { UserRepository } from 'src/repositories/user/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async create(data: UserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExists();
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: data.avatar,
    };
  }
}
