import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/data/user.repository";
import { User } from "src/domain/models/user.model";
import { GetUserById } from "./get-user-by-id.usecase";
import { EncrypterService } from "src/core/common/encrypter.service";

@Injectable()
export class UpdateUser {
    constructor(
        private readonly repository: UserRepository,
        private readonly getUserById: GetUserById,
        private readonly encrypter: EncrypterService,
    ) {}

    async execute(id: number, data: User) {
        const user = await this.getUserById.execute(id);

        if (!user) {
            return null;
        }

        user.names = data.names;
        user.lastName = data.lastName;
        user.email = data.email;
        user.password = await this.encrypter.encrypt(data.password);
        user.role = data.role;
        user.code = data.code;

        await this.repository.update(user);

        return user;
    }
}