import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleDTO } from './dtos/role.dto';
import { RoleRepository } from './repositories/role.repository';
import { Messages } from 'src/common/messages/messages';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(data: RoleDTO) {
    const roleAlreadyExists = await this.roleRepository.findByName(data.name);

    if (roleAlreadyExists) {
      throw new ConflictException(Messages.ROLE.ALREADY_EXISTS);
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
    const role = await this.roleRepository.findMany();

    if (!role) {
      throw new NotFoundException(Messages.ROLE.NOT_FOUND);
    }

    return role;
  }

  async delete(id: string) {
    const role = await this.roleRepository.findByID(id);

    if (!role) {
      throw new NotFoundException(Messages.ROLE.NOT_FOUND);
    }

    await this.roleRepository.deleteRole(id);

    return { message: Messages.ROLE.DELETED };
  }
}
