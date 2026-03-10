import { Controller, Post, Body, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUserDTO, UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() body: UserDTO) {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async get(@Body() body: GetUserDTO) {
    return await this.userService.get(body);
  }

  @Patch('update')
  async update(@Body() body: UserDTO) {
    return await this.userService.update(body);
  }
}
