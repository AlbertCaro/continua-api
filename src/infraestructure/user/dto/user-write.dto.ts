import { Role } from "src/domain/models/role.enum";
import { User } from "src/domain/models/user.model";
import { IsNotEmpty } from "class-validator";
import { PasswordMatch } from "../validation/password.validator";
import { UniqueCode } from "../validation/unique-code.validator";
import { UniqueEmail } from "../validation/unique-email.validator";

export class UserWriteDto {
    @IsNotEmpty()
    names: string;

    @IsNotEmpty()
    lastName: string;
    
    @IsNotEmpty()
    @UniqueEmail()
    email: string;

    @IsNotEmpty()
    @PasswordMatch()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @IsNotEmpty()
    role: Role;

    @IsNotEmpty()
    @UniqueCode()
    code: number;

    toDomain() {
        const model = new User();

        model.names = this.names;
        model.lastName = this.lastName;
        model.email = this.email;
        model.password = this.password;
        model.role = this.role;
        model.code = this.code;

        return model;
    }
}