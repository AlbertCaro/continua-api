import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/domain/models/user.model";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async getToken(user: User) {
        return await this.jwtService.signAsync({ id: user.id })
    }
}