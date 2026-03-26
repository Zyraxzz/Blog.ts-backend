import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostRepository } from './repositories/post.repository';
import { ImageService } from 'src/common/upload/image.service';

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostRepository, ImageService],
  controllers: [PostController],
  exports: [PostService, PostRepository],
})
export class PostModule {}
