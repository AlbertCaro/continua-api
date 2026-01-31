import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncrypterService {
    async encrypt(text: string) {
        return await bcrypt.hash(text, 10);
    }
}