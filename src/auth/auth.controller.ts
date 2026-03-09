import { Controller, Post, Body } from '@nestjs/common';
import * as loginDto from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async auth(@Body() body: loginDto.LoginDTO) {
    return await this.authService.auth(body);
  }
}
