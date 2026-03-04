import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() body: UserDTO) {
    await this.userService.create(body);

    return body;
  }
}
