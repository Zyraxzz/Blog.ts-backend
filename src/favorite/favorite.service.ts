import { ConflictException, Injectable } from '@nestjs/common';
import { FavoriteDTO } from './dtos/favorite.dto';
import { FavoriteRepository } from './repositories/favorite.repository';
import { Messages } from 'src/common/messages/messages';

@Injectable()
export class FavoriteService {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async create(user_id: string, data: FavoriteDTO) {
    const favoriteAlreadyExists =
      await this.favoriteRepository.findByUserAndPost(user_id, data.post_id);

    if (favoriteAlreadyExists) {
      throw new ConflictException(Messages.FAVORITE.ALREADY_EXISTS);
    }

    return await this.favoriteRepository.createFavorite({
      user_id,
      post_id: data.post_id,
    });
  }
}
