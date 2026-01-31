import { Role } from "src/domain/models/role.enum";
import { User } from "src/domain/models/user.model";
import { IsNotEmpty } from "class-validator";
import { PasswordMatch } from "../validation/password.validator";
import { UniqueCode } from "../validation/unique-code.validator";
import { UniqueEmail } from "../validation/unique-email.validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserWriteDto {
    @ApiProperty({ example: 'Alberto' })
    @IsNotEmpty()
    names: string;
    
    @ApiProperty({ example: 'Caro' })
    @IsNotEmpty()
    lastName: string;
    
    @ApiProperty({ example: 'albertcaro@gmail.com' })
    @IsNotEmpty()
    @UniqueEmail()
    email: string;
    
    @ApiProperty({ example: 'hola123' })
    @IsNotEmpty()
    @PasswordMatch()
    password: string;
    
    @ApiProperty({ example: 'hola123' })
    @IsNotEmpty()
    confirmPassword: string;
    
    @ApiProperty({ example: Role.STUDENT })
    @IsNotEmpty()
    role: Role;
    
    @ApiProperty({ example: 215818158 })
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