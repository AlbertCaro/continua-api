import { Injectable } from '@nestjs/common';
import { ReceiptRepository } from 'src/data/receipt.repository';

@Injectable()
export class GetPaymentReceipt {
  constructor(private readonly repository: ReceiptRepository) {}

  async execute(paymentId: number) {
    return await this.repository.fetchByPaymentId(paymentId);
  }
}
