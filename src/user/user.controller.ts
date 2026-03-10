import { Controller, Post, Body, Get } from '@nestjs/common';
import { GetUserDTO, UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() body: UserDTO) {
    return await this.userService.create(body);
  }

  @Get('get')
  async get(@Body() body: GetUserDTO) {
    return await this.userService.get(body);
  }
}
