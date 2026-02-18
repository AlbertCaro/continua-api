import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/data/user.repository';

@Injectable()
export class GetUserById {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: number) {
    const user = await this.repository.findById(id);

    return user;
  }
}
