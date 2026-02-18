import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/data/user.repository';

@Injectable()
export class GetUserByCode {
  constructor(private readonly repository: UserRepository) {}

  async execute(code: number) {
    return await this.repository.findByCode(code);
  }
}
