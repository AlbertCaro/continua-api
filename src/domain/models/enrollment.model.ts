import { Inscripcion } from 'src/data/database/entity/enrollment.entity';
import { Payment } from './payment.model';
import { User } from './user.model';
import { Course } from './course.model';

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
    entity.alumno = this.student.toDatabase();
    entity.curso = this.course.toDatabase();
    entity.pagos = this.payments.map((payment) => payment.toDatabase());

    return entity;
  }
}
