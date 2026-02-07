import { Module } from '@nestjs/common';
import { DbModule } from './db.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { PaymentModule } from './payment.module';

@Module({
  imports: [DbModule, UserModule, AuthModule, PaymentModule],
})
export class AppModule {}
