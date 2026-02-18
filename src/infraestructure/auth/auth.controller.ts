import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginCredentials } from './dto/login-credentials.dto';
import { Login } from 'src/domain/usecases/auth/login.usecase';
import { Token } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('login')
  async logIn(@Body() credentials: LoginCredentials) {
    const token = await this.login.execute(credentials);

    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    return new Token(token);
  }
}
