import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostDTO } from './dtos/post.dto';
import { Messages } from 'src/common/messages/messages';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(data: PostDTO) {
    const post = await this.postRepository.createPost({
      ...data,
      image: data.image,
    });

    return {
      message: Messages.POST.CREATED,
      data: post,
    };
  }

  async getAll() {
    const posts = await this.postRepository.findMany();

    if (!posts || posts.length === 0) {
      throw new NotFoundException(Messages.POST.NOT_FOUND);
    }

    return posts;
  }

  async get(id: string) {
    const post = await this.postRepository.findByID(id);

    if (!post) {
      throw new NotFoundException(Messages.POST.NOT_FOUND);
    }

    return post;
  }

  async delete(id: string) {
    const post = await this.postRepository.findByID(id);

    if (!post) {
      throw new NotFoundException();
    }

    await this.postRepository.deletePost(id);

    return { message: Messages.POST.DELETED };
  }
}
