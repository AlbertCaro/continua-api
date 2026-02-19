import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LoginCredentials } from './dto/login-credentials.dto';
import { Login } from 'src/domain/usecases/auth/login.usecase';
import { Token } from './dto/token.dto';
import { GetLoggedUser } from '../../domain/usecases/user/get-logged-user.usecase';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: Login,
    private readonly getLoggedUser: GetLoggedUser,
  ) {}

  @Post('login')
  async logIn(@Body() credentials: LoginCredentials) {
    const token = await this.login.execute(credentials);

    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    return new Token(token);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile() {
    const user = await this.getLoggedUser.execute();
    return user!.toRead();
  }
}
