import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO, UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async findByID(id: string) {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async createUser(data: UserDTO) {
    return this.prismaService.user.create({ data });
  }

  async deleteUser(id: string) {
    await this.prismaService.user.delete({
      where: { id },
    });
  }

  async updateUser(id: string, data: Partial<UpdateUserDTO>) {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
