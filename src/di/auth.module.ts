import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "src/core/auth/token.service";
import { Login } from "src/domain/usecases/auth/login.usecase";
import { CommonModule } from "./common.module";
import { AuthController } from "src/infraestructure/auth/auth.controller";
import { JwtStrategy } from "src/infraestructure/auth/jwt.strategy";
import { RoleGuard } from "src/infraestructure/auth/role.guard";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: 'secreto',
            signOptions: {
                expiresIn: '1h',
            }
        }),
        CommonModule,
    ],
    providers: [
        TokenService,
        Login,
        JwtStrategy,
        RoleGuard,
    ],
    controllers: [
        AuthController,
    ]
})
export class AuthModule {}