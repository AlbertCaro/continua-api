import { Module } from "@nestjs/common";
import { UserRepository } from "src/data/user.repository";
import { CreateUser } from "src/domain/usecases/user/create-user.usecase";
import { GetUserByCode } from "src/domain/usecases/user/get-user-by-code.usecase";
import { UserController } from "src/infraestructure/user/user.controller";
import { UniqueCodeValidator } from "src/infraestructure/user/validation/unique-code.validator";
import { CommonModule } from "./common.module";
import { GetUserByEmail } from "src/domain/usecases/user/get-user-by-email.usecase";
import { UniqueEmailValidator } from "src/infraestructure/user/validation/unique-email.validator";
import { GetUserById } from "src/domain/usecases/user/get-user-by-id.usecase";
import { GetAllUsers } from "src/domain/usecases/user/get-all-users.usecase";
import { UpdateUser } from "src/domain/usecases/user/update-user.usecase";
import { DeleteUser } from "src/domain/usecases/user/delete-user.usecase";

@Module({
    imports: [CommonModule],
    providers: [
        UserRepository,
        CreateUser,
        GetUserByCode,
        GetUserByEmail,
        GetUserById,
        GetAllUsers,
        UpdateUser,
        DeleteUser,
        UniqueCodeValidator,
        UniqueEmailValidator,
    ],
    controllers: [UserController],
    exports: [
        GetUserByEmail,
        GetUserById,
    ]
})
export class UserModule {}