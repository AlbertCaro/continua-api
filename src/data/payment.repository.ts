import { Injectable } from '@nestjs/common';
import { Pago } from './database/entity/payment.entity';
import { Payment } from 'src/domain/models/payment.model';

@Injectable()
export class PaymentRepository {
  async fetchAll() {
    const payments = await Pago.find();

    return payments.map((payment) => payment.toDomain());
  }

  async fetchById(id: number) {
    return (await Pago.findOneBy({ id }))?.toDomain();
  }

  async create(payment: Payment) {
    const entity = payment.toDatabase();

    await entity.save();

    return entity.toDomain();
  }

  async delete(payment: Payment) {
    await payment.toDatabase().remove();
  }
}
