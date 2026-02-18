import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/models/role.enum';

export const AUTH_ROLE_KEY = 'roles';
export const Auth = (...roles: Role[]) => SetMetadata(AUTH_ROLE_KEY, roles);
