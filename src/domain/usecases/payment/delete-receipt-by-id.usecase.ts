import { Injectable } from "@nestjs/common";
import { GetPaymentReceipt } from "./get-payment-receipt.usecase";
import { ReceiptRepository } from "src/data/receipt.repository";

@Injectable()
export class DeleteReceiptById {
  constructor (
    private readonly getPaymentReceipt: GetPaymentReceipt,
    private readonly repository: ReceiptRepository
  ) {
  }

  async execute (id: number) {
    const receipt = await this.getPaymentReceipt.execute(id);

    if (receipt) {
      await this.repository.delete(receipt);
    }
  }
}