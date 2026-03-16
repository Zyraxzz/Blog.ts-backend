import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDTO } from 'src/role/dtos/role.dto';

@Injectable()
export class RoleRepository {
  constructor(private prismaService: PrismaService) {}

  async findByName(name: string) {
    return this.prismaService.role.findFirst({
      where: { name },
    });
  }

  async findByID(id: string) {
    return this.prismaService.role.findFirst({
      where: { id },
    });
  }

  async findMany() {
    return this.prismaService.role.findMany({});
  }

  async createRole(data: RoleDTO) {
    return this.prismaService.role.create({ data });
  }

  async deleteRole(id: string) {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
