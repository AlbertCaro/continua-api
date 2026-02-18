import { ApiHideProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Payment } from 'src/domain/models/payment.model';
import { IsEnrollemntId } from '../../enrollment/validation/is-enrollment-id.validator';

export class PaymentDto {
  @ApiHideProperty()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  bank: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsEnrollemntId()
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
