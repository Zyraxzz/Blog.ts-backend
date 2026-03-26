import { CategoryRepository } from './repositories/category.repository';
import { RoleDTO } from 'src/role/dtos/role.dto';
import { Messages } from 'src/common/messages/messages';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: RoleDTO) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      data.name,
    );

    if (categoryAlreadyExists) {
      throw new ConflictException(Messages.CATEGORY.ALREADY_EXISTS);
    }

    const category = await this.categoryRepository.createCategory({
      name: data.name,
    });

    return {
      data: {
        id: category.id,
        name: category.name,
      },
    };
  }

  async get() {
    const categories = await this.categoryRepository.findMany();

    if (!categories || categories.length === 0) {
      throw new NotFoundException(Messages.CATEGORY.NOT_FOUND);
    }

    return categories;
  }

  async delete(id: string) {
    const category = await this.categoryRepository.findByID(id);

    if (!category) {
      throw new NotFoundException(Messages.CATEGORY.NOT_FOUND);
    }

    await this.categoryRepository.deleteCategory(id);

    return { message: Messages.CATEGORY.DELETED };
  }
}
