import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from '../../user/dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async create(data: UserDTO) {
    return this.prismaService.user.create({ data });
  }
}
