import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/data/payment.repository';

@Injectable()
export class GetPaymentById {
  constructor(private readonly repository: PaymentRepository) {}

  async execute(id: number) {
    return await this.repository.fetchById(id);
  }
}
