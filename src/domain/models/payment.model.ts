import { Pago } from 'src/data/database/entity/payment.entity';
import { Enrollment } from './enrollment.model';
import { Receipt } from './receipt.model';

export class Payment {
  id?: number;

  bank: string;

  amount: number;

  enrollment: Enrollment;

  receipt: Receipt;

  toDatabase() {
    const entity = new Pago();

    entity.id = this.id;
    entity.banco = this.bank;
    entity.monto = this.amount;
    entity.inscripcion = this.enrollment.toDatabase();
    entity.comprobante = this.receipt.toDatabase();

    return entity;
  }
}
