import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { GetUserDTO, UserDTO } from './dtos/user.dto';
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
  @UsePipes(new ZodValidationPipe(GetUserDTO.schema))
  async get(@Body() body: GetUserDTO) {
    return await this.userService.get(body);
  }
}
