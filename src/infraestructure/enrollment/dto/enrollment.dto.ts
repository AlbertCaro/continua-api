import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Enrollment } from 'src/domain/models/enrollment.model';
import { IsCourseId } from 'src/infraestructure/course/validation/is-course-id.validator';
import { PaymentDto } from 'src/infraestructure/payment/dto/payment.dto';
import { IsUserId } from 'src/infraestructure/user/validation/is-user-id.validator';

export class EnrollmentDto {
  @ApiHideProperty()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  reasons: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsUserId()
  student: number;

  @IsNotEmpty()
  @IsCourseId()
  course: number;

  @IsOptional()
  payments: PaymentDto[];

  toDomain() {
    const model = new Enrollment();

    model.id = this.id;
    model.reasons = this.reasons;
    model.date = this.date;
    model.price = this.price;

    return model;
  }
}
