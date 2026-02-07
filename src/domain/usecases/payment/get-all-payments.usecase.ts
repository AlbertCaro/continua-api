import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/data/payment.repository';

@Injectable()
export class GetAllPayments {
  constructor(private readonly repository: PaymentRepository) {}

  async execute() {
    return await this.repository.fetchAll();
  }
}
