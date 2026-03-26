import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(AuthGuard)
  @Get('all')
  async getAll() {
    return await this.postService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.postService.get(id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}
