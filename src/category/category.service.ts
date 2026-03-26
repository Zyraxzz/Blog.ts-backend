import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { AlreadyExists } from 'src/common/errors/alreadyExists';
import { RoleDTO } from 'src/role/dtos/role.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: RoleDTO) {
    const CategoryAlreadyExists = await this.categoryRepository.findByName(
      data.name,
    );

    if (CategoryAlreadyExists) {
      throw new AlreadyExists();
    }

    const category = await this.categoryRepository.createCategory({
      name: data.name,
    });

    return {
      id: category.id,
      name: category.name,
    };
  }

  async get() {
    const category = await this.categoryRepository.findMany();

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async delete(id: string) {
    const category = await this.categoryRepository.findByID(id);

    if (!category) {
      throw new NotFoundException();
    }

    await this.categoryRepository.deleteCategory(id);

    return;
  }
}
