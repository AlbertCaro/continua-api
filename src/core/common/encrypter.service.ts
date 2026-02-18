import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncrypterService {
  async compare(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }

  async encrypt(text: string) {
    return await bcrypt.hash(text, 10);
  }
}
