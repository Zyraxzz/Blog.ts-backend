import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDTO } from './dtos/favorite.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() req, @Body() body: FavoriteDTO) {
    const user_id = req.user.id;
    return await this.favoriteService.create(user_id, body);
  }
}
