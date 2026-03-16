import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleDTO } from './dtos/role.dto';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async crete(@Body() body: RoleDTO) {
    return await this.roleService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async get() {
    return await this.roleService.get();
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }
}
