import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleDTO } from './dtos/role.dto';
import { RoleRepository } from '../repositories/role/role.repository';
import { AlreadyExists } from 'src/common/errors/alreadyExists';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(data: RoleDTO) {
    const RoleAlreadyExists = await this.roleRepository.findByName(data.name);

    if (RoleAlreadyExists) {
      throw new AlreadyExists();
    }

    const role = await this.roleRepository.createRole({
      name: data.name,
    });

    return {
      id: role.id,
      name: role.name,
    };
  }

  async get() {
    const role = await this.roleRepository.findManyByName();

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }
}
