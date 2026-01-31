import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "src/domain/models/user.model";
import { CreateUser } from "src/domain/usecases/user/create-user.usecase";
import { instanceToInstance, plainToInstance } from "class-transformer"
import { UserReadDto } from "./dto/user-read.dto";
import { UserWriteDto } from "./dto/user-write.dto";

@Controller('users')
export class UserController {
    constructor(private readonly createUser: CreateUser) {}
    
    @Get()
    getAll() {
        return "Hola"
    }

    @Post()
    async save(@Body() dto: UserWriteDto) {
        const user = await this.createUser.execute(dto.toDomain())

        return user.toRead()
    }
}