import { Role } from "src/domain/models/role.enum";

export class UserReadDto {
    id?: number;
    names: string;
    lastName: string;
    email: string;
    role: Role;
    code: number;
}