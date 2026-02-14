import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Payment } from 'src/domain/models/payment.model';

export class PaymentDto {
  @ApiHideProperty()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  bank: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  enrollment: number;

  toDomain() {
    const model = new Payment();

    model.id = this.id;
    model.date = this.date;
    model.bank = this.bank;
    model.amount = this.amount;

    return model;
  }
}
