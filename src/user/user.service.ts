import { ConflictException, Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(data: UserDTO) {
    const userAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await this.prismaService.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: passwordHash,
        avatar: data.avatar,
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: data.avatar,
    };
  }
}
