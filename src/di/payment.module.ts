import { Module } from '@nestjs/common';
import { PaymentController } from 'src/infraestructure/payment/dto/payment.controller';

@Module({
  controllers: [PaymentController],
})
export class PaymentModule {}
