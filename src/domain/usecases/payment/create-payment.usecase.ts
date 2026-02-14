import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/data/payment.repository';
import { Payment } from 'src/domain/models/payment.model';
import { GetEnrollmentById } from '../enrollment/get-enrollment-by-id.usecase';

@Injectable()
export class CreatePayment {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly getEnrollmentById: GetEnrollmentById,
  ) {}

  async execute(payment: Payment, enrollmentId: number) {
    const enrollment = await this.getEnrollmentById.execute(enrollmentId);

    payment.enrollment = enrollment!!;

    return await this.repository.create(payment);
  }
}
