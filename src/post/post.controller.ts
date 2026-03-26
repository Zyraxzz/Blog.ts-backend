import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { PostDTO } from './dtos/post.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body(new ZodValidationPipe(PostDTO.schema)) body: PostDTO) {
    return await this.postService.create(body);
  }
}
