import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CategoryDTO } from './dtos/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async crete(@Body() body: CategoryDTO) {
    return await this.categoryService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async get() {
    return await this.categoryService.get();
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
