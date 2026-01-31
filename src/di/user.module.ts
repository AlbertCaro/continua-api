import { Module } from "@nestjs/common";
import { UserRepository } from "src/data/user.repository";
import { CreateUser } from "src/domain/usecases/user/create-user.usecase";
import { GetUserByCode } from "src/domain/usecases/user/get-user-by-code.usecase";
import { UserController } from "src/infraestructure/user/user.controller";
import { UniqueCodeValidator } from "src/infraestructure/user/validation/unique-code.validator";
import { CommonModule } from "./common.module";
import { GetUserByEmail } from "src/domain/usecases/user/get-user-by-email.usecase";
import { UniqueEmailValidator } from "src/infraestructure/user/validation/unique-email.validator";

@Module({
    imports: [CommonModule],
    providers: [
        UserRepository,
        CreateUser,
        GetUserByCode,
        GetUserByEmail,
        UniqueCodeValidator,
        UniqueEmailValidator,
    ],
    controllers: [UserController]
})
export class UserModule {}