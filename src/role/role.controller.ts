import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RoleDTO } from './dtos/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('create')
  async crete(@Body() body: RoleDTO) {
    return await this.roleService.create(body);
  }

  @Get('all')
  async get() {
    return await this.roleService.get();
  }

  @Delete('delete')
  async delete(@Body() body: RoleDTO) {
    return await this.roleService.delete(body);
  }
}
