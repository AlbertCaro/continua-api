import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user.model";
import { Usuario } from "./database/entity/user.entity";

@Injectable()
export class UserRepository {

    async create(user: User) {
        const entity = user.toEntity()

        await entity.save()

        return entity.toDomain()
    }

    async findByCode(code: number) {
        return (await Usuario.findOneBy({ codigo: code }))?.toDomain()
    }

    async findByEmail(email: string) {
        return (await Usuario.findOneBy({ correo: email }))?.toDomain()
    }
}