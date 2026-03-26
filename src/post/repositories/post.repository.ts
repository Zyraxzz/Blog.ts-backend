import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDTO } from '../dtos/post.dto';

@Injectable()
export class PostRepository {
  constructor(private prismaService: PrismaService) {}

  async createPost({ categories, ...data }: PostDTO) {
    return this.prismaService.post.create({
      data: {
        ...data,
        categories: {
          create: categories?.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    });
  }

  async findMany() {
    return this.prismaService.post.findMany({});
  }

  async findByID(id: string) {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  async deletePost(id: string) {
    return this.prismaService.post.delete({
      where: { id },
    });
  }
}
