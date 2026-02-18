import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/data/user.repository';

@Injectable()
export class GetAllUsers {
  constructor(private readonly repository: UserRepository) {}

  async execute() {
    return this.repository.findAll();
  }
}
