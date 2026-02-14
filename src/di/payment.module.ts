import { Module } from '@nestjs/common';
import { PaymentController } from 'src/infraestructure/payment/payment.controller';
import { UserModule } from './user.module';
import { CreatePayment } from 'src/domain/usecases/payment/create-payment.usecase';
import { CreateReceipt } from 'src/domain/usecases/payment/create-receipt.usecase';
import { GetAllPayments } from 'src/domain/usecases/payment/get-all-payments.usecase';
import { GetPaymentById } from 'src/domain/usecases/payment/get-payment-by-id.usecase';
import { GetPaymentReceipt } from 'src/domain/usecases/payment/get-payment-receipt.usecase';
import { PaymentRepository } from 'src/data/payment.repository';
import { ReceiptRepository } from 'src/data/receipt.repository';
import { DeletePaymentById } from 'src/domain/usecases/payment/delete-payment-by-id.usecase';
import { DeleteReceiptById } from 'src/domain/usecases/payment/delete-receipt-by-id.usecase';
import { EnrollmentModule } from './enrollment.module';

@Module({
  imports: [UserModule, EnrollmentModule],
  providers: [
    CreatePayment,
    CreateReceipt,
    GetAllPayments,
    GetPaymentById,
    GetPaymentReceipt,
    DeletePaymentById,
    DeleteReceiptById,
    PaymentRepository,
    ReceiptRepository,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
