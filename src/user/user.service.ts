import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserDTO, UpdateUserDTO, UserDTO } from './dtos/user.dto';
import * as argon2 from 'argon2';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ImageService } from 'src/common/upload/image.service';
import { Messages } from 'src/common/messages/messages';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private imageService: ImageService,
  ) {}

  async create(data: UserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new ConflictException(Messages.USER.ALREADY_EXISTS);
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await this.userRepository.createUser({
      ...data,
      password: passwordHash,
      avatar: data.avatar,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async get(id: string) {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new UnauthorizedException(Messages.USER.INVALID_CREDENTIALS);
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new NotFoundException(Messages.USER.NOT_FOUND);
    }

    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await argon2.hash(data.password);
    }

    if (data.avatar && user.avatar) {
      await this.imageService.removeImage('avatar', user.avatar);
    }

    const updatedUser = await this.userRepository.updateUser(id, updateData);

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    };
  }

  async delete(id: string) {
    const user = await this.userRepository.findByID(id);

    if (!user) {
      throw new NotFoundException(Messages.USER.NOT_FOUND);
    }

    await this.userRepository.deleteUser(id);

    return { message: Messages.USER.DELETED };
  }
}
