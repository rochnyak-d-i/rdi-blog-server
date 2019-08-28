import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = {
      login: user.login,
      sub: user.id
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
