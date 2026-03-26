import { Injectable } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostDTO } from './dtos/post.dto';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(data: PostDTO) {
    const post = await this.postRepository.createPost({
      ...data,
      image: data.image,
    });

    return post;
  }
}
