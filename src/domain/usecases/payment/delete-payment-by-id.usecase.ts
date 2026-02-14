import { Injectable } from '@nestjs/common';
import { GetPaymentById } from './get-payment-by-id.usecase';
import { PaymentRepository } from 'src/data/payment.repository';
import { DeleteReceiptById } from './delete-receipt-by-id.usecase';

@Injectable()
export class DeletePaymentById {
  constructor(
    private readonly getPaymentById: GetPaymentById,
    private readonly repository: PaymentRepository,
    private readonly deleteReceiptById: DeleteReceiptById,
  ) {}

  async execute(id: number) {
    await this.deleteReceiptById.execute(id);

    const payment = await this.getPaymentById.execute(id);

    if (payment) {
      await this.repository.delete(payment);
    }
  }
}
