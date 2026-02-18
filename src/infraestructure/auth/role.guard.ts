import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/domain/models/role.enum';
import { GetUserById } from 'src/domain/usecases/user/get-user-by-id.usecase';
import { AUTH_ROLE_KEY } from './auth-role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly getUserById: GetUserById,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      AUTH_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user: payload } = context.switchToHttp().getRequest();

    const user = await this.getUserById.execute(payload.id);

    if (!user) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
