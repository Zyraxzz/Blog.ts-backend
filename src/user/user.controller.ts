import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetUserDTO, UserDTO, UpdateUserDTO } from './dtos/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { multerConfig } from 'src/config/multer.config';
import { AvatarRemoveInterceptor } from 'src/common/interceptors/avatar-remove.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('avatar', multerConfig),
    AvatarRemoveInterceptor,
  )
  async create(
    @Body(new ZodValidationPipe(UserDTO.schema)) body: UserDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.userService.create({
      ...body,
      avatar: file?.filename,
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async get(@Body(new ZodValidationPipe(GetUserDTO.schema)) body: GetUserDTO) {
    return await this.userService.get(body);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('avatar', multerConfig),
    AvatarRemoveInterceptor,
  )
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UserDTO.schema)) body: UpdateUserDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.userService.update(id, {
      ...body,
      avatar: file?.filename,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  @UseInterceptors(
    FileInterceptor('avatar', multerConfig),
    AvatarRemoveInterceptor,
  )
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
