import { Injectable } from '@nestjs/common';
import { EncrypterService } from 'src/core/common/encrypter.service';
import { UserRepository } from 'src/data/user.repository';
import { User } from 'src/domain/models/user.model';

@Injectable()
export class CreateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly encrypter: EncrypterService,
  ) {}

  async execute(user: User) {
    user.password = await this.encrypter.encrypt(user.password);

    return await this.repository.create(user);
  }
}
