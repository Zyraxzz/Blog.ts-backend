import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @UsePipes(new ZodValidationPipe(UserDTO))
  async create(@Body() body: UserDTO) {
    await this.userService.create(body);

    return body;
  }
}
