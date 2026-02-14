import { Inscripcion } from 'src/data/database/entity/enrollment.entity';
import { Payment } from './payment.model';
import { User } from './user.model';
import { Course } from './course.model';
import { EnrollmentDto } from 'src/infraestructure/enrollment/dto/enrollment.dto';

export class Enrollment {
  id: number;

  reasons: string;

  date: Date;

  price: number;

  student: User;

  course: Course;

  payments: Payment[];

  toDatabase() {
    const entity = new Inscripcion();

    entity.id = this.id;
    entity.motivos = this.reasons;
    entity.fecha = this.date;
    entity.precio = this.price;

    if (this.student) {
      entity.alumno = this.student.toDatabase();
    }

    if (this.course) {
      entity.curso = this.course.toDatabase();
    }

    if (this.payments) {
      entity.pagos = this.payments.map((payment) => payment.toDatabase());
    }

    return entity;
  }

  toDto(includeRelations: boolean = true) {
    const dto = new EnrollmentDto();

    dto.id = this.id;
    dto.reasons = this.reasons;
    dto.date = this.date;
    dto.price = this.price;
    dto.course = this.course.id;

    if (includeRelations) {
      dto.student = this.student.id;

      if (this.payments) {
        dto.payments = this.payments.map((payment: Payment) => payment.toDto());
      }
    }

    return dto;
  }
}
