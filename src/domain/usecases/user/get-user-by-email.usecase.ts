import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/data/user.repository";

@Injectable()
export class GetUserByEmail {
    constructor(private readonly repository: UserRepository) {}

    async execute(email: string) {
        return await this.repository.findByEmail(email);
    }
}