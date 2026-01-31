import { Module } from '@nestjs/common';
import { DbModule } from './db.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [DbModule, UserModule, AuthModule],
})
export class AppModule {}
