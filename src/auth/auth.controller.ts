import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ZodValidationPipe(LoginDTO))
  @Post('login')
  async auth(@Body() body: LoginDTO) {
    return await this.authService.auth(body);
  }
}
