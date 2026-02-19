import { Injectable } from '@nestjs/common';
import { UserContextService } from '../../../core/auth/user-context.service';
import { GetUserById } from './get-user-by-id.usecase';

@Injectable()
export class GetLoggedUser {
  constructor(
    private readonly userContextService: UserContextService,
    private readonly getUserById: GetUserById,
  ) {}

  async execute() {
    const userId = this.userContextService.getUserId();

    return this.getUserById.execute(userId);
  }
}
