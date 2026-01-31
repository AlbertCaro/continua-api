import { Module } from "@nestjs/common";
import { EncrypterService } from "src/core/common/encrypter.service";

@Module({
    providers: [
        EncrypterService,
    ],

    exports: [
        EncrypterService,
    ]
})
export class CommonModule {}