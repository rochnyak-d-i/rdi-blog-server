import {
  Controller,
  Post, Body,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('/')
  async login(@Body() body: LoginUserDto) {
    const admin = this.configService.get('auth.admin');

    if (
      body.username !== admin.username ||
      body.password !== admin.password
    ) {
      throw new BadRequestException('Логин или пароль введены неверно');
    }

    const jwt = await this.authService.login(admin);

    return jwt;
  }
}
