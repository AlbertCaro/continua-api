import { Module } from '@nestjs/common';
import { DbModule } from './db.module';
import { UserModule } from './user.module';

@Module({
  imports: [DbModule, UserModule],
})
export class AppModule {}
