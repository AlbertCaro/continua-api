import { Module } from '@nestjs/common';
import { EncrypterService } from 'src/core/common/encrypter.service';
import { UserContextService } from '../core/auth/user-context.service';

@Module({
  providers: [EncrypterService, UserContextService],

  exports: [EncrypterService, UserContextService],
})
export class CommonModule {}
