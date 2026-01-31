import { Usuario } from "src/data/database/entity/user.entity";
import { Role } from "./role.enum";
import { UserReadDto } from "src/infraestructure/user/dto/user-read.dto";

export class User {
    id: number;

    names: string;

    lastName: string;

    email: string;

    password: string;

    role: Role;

    code: number;

    toEntity() {
        const entity = new Usuario();
        
        entity.id = this.id;
        entity.nombres = this.names;
        entity.apellidos = this.lastName;
        entity.correo = this.email;
        entity.password = this.password;
        entity.rol = this.role;
        entity.codigo = this.code;

        return entity;
    }

    

    toRead() {
        const dto = new UserReadDto();
        
        dto.id = this.id;
        dto.names = this.names;
        dto.lastName = this.lastName;
        dto.email = this.email;
        dto.role = this.role;
        dto.code = this.code;

        return dto;
    }
}