import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { GetUserDTO, UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ZodValidationPipe(UserDTO.schema))
  @Post('create')
  async create(@Body() body: UserDTO) {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @UsePipes(new ZodValidationPipe(GetUserDTO.schema))
  async get(@Body() body: GetUserDTO) {
    return await this.userService.get(body);
  }

  @Patch('update')
  async update(@Body() body: UserDTO) {
    return await this.userService.update(body);
  }
}
