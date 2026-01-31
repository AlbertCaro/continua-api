import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user.model";
import { Usuario } from "./database/entity/user.entity";

@Injectable()
export class UserRepository {

    async create(user: User) {
        const entity = user.toEntity()

        await entity.save() // INSERT INTO usuario VALUES (?, ? ...)

        return entity.toDomain()
    }

    async findByCode(code: number) {
        return (await Usuario.findOneBy({ codigo: code }))?.toDomain()
    }

    async findByEmail(email: string) {
        return (await Usuario.findOneBy({ correo: email }))?.toDomain() // SELECT * FROM usuario WHERE correo = ?
    }

    async findById(id: number) {
        return (await Usuario.findOneBy({ id }))?.toDomain() // SELECT * FROM usuario WHERE id = ?
    }

    async findAll() {
        const users = await Usuario.find() // SELECT * FROM usuario;

        return users.map((user) => user.toDomain())
    }

    async update(user: User) {
        const entity = user.toEntity();

        await entity.save(); // UPDATE SET correo = 2 ... WHERE id = ?
    }

    async delete(user: User) {
        const entity = user.toEntity();

        await entity.remove() // DELETE FROM usuario WHERE id = ?
    }
}