import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  async create(data: UserDTO) {
    return data;
  }
}
