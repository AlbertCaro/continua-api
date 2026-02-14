import { Pago } from 'src/data/database/entity/payment.entity';
import { Enrollment } from './enrollment.model';
import { Receipt } from './receipt.model';
import { PaymentDto } from 'src/infraestructure/payment/dto/payment.dto';

export class Payment {
  id?: number;

  date: Date;

  bank: string;

  amount: number;

  enrollment: Enrollment;

  receipt: Receipt;

  toDatabase() {
    const entity = new Pago();

    entity.id = this.id;
    entity.banco = this.bank;
    entity.fecha = this.date;
    entity.monto = this.amount;

    if (this.enrollment) {
      entity.inscripcion = this.enrollment.toDatabase();
    }

    if (this.receipt) {
      entity.comprobante = this.receipt.toDatabase();
    }

    return entity;
  }

  toDto() {
    const dto = new PaymentDto();

    dto.id = this.id;
    dto.date = this.date;
    dto.bank = this.bank;
    dto.amount = this.amount;

    if (this.enrollment) {
      dto.enrollment = this.enrollment.id;
    }

    return dto;
  }
}
