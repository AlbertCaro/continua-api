import { Injectable } from '@nestjs/common';
import { Enrollment } from 'src/domain/models/enrollment.model';
import { Inscripcion } from './database/entity/enrollment.entity';

@Injectable()
export class EnrollmentRepository {
  async create(enrollment: Enrollment) {
    const entity = enrollment.toDatabase();

    await entity.save();

    return entity.toDomain();
  }

  async findById(id: number): Promise<Enrollment | null> {
    return (
      await Inscripcion.findOne({
        where: { id },
        relations: ['alumno', 'curso', 'pagos'],
      })
    )?.toDomain();
  }

  async findAll() {
    const enrollments = await Inscripcion.find({
      relations: ['alumno', 'curso'],
    });

    return enrollments.map((enrollment) => enrollment.toDomain());
  }

  async update(enrollment: Enrollment) {
    const entity = enrollment.toDatabase();

    await entity.save();
  }

  async delete(enrollment: Enrollment) {
    const entity = enrollment.toDatabase();

    await entity.remove();
  }

  async findByUserAndCourse(userId: number, courseId: number) {
    const entity = await Inscripcion.findOne({
      where: { alumno: { id: userId }, curso: { id: courseId } },
    });

    return entity?.toDomain();
  }
}
