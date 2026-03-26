import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDTO } from '../dtos/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async findByName(name: string) {
    return this.prismaService.category.findFirst({
      where: { name },
    });
  }

  async findByID(id: string) {
    return this.prismaService.category.findFirst({
      where: { id },
    });
  }

  async findMany() {
    return this.prismaService.category.findMany({});
  }

  async createCategory(data: CategoryDTO) {
    return this.prismaService.category.create({ data });
  }

  async deleteCategory(id: string) {
    await this.prismaService.category.delete({
      where: { id },
    });
  }
}
