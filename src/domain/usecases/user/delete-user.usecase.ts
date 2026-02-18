import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/data/user.repository';
import { GetUserById } from './get-user-by-id.usecase';

@Injectable()
export class DeleteUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly getUserById: GetUserById,
  ) {}

  async execute(id: number) {
    const user = await this.getUserById.execute(id);

    if (!user) {
      return null;
    }

    await this.repository.delete(user);

    return user;
  }
}
