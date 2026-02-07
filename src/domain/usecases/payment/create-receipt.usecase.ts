import { Injectable } from '@nestjs/common';
import { ReceiptRepository } from 'src/data/receipt.repository';
import { Receipt } from 'src/domain/models/receipt.model';
import { GetPaymentById } from './get-payment-by-id.usecase';
import { GetPaymentReceipt } from './get-payment-receipt.usecase';

@Injectable()
export class CreateReceipt {
  constructor(
    private readonly repository: ReceiptRepository,
    private readonly getPaymentById: GetPaymentById,
    private readonly getPaymentReceipt: GetPaymentReceipt,
  ) {}

  async execute(receipt: Receipt, paymentId: number) {
    const payment = await this.getPaymentById.execute(paymentId);

    if (!payment) {
      return null;
    }

    const oldReceipt = await this.getPaymentReceipt.execute(paymentId);

    if (oldReceipt) {
      await this.repository.delete(oldReceipt);
    }

    receipt.payment = payment;

    return await this.repository.create(receipt);
  }
}
