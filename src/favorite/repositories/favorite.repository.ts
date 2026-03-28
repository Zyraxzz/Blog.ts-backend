import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteRepository {
  constructor(private prismaService: PrismaService) {}

  async findByUserAndPost(user_id: string, post_id: string) {
    return await this.prismaService.favorite.findFirst({
      where: {
        user_id: user_id,
        post_id: post_id,
      },
    });
  }

  async createFavorite(data: { user_id: string; post_id: string }) {
    return await this.prismaService.favorite.create({ data });
  }
}
