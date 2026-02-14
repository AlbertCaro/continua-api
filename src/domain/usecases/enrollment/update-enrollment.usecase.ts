import { Injectable } from '@nestjs/common';
import { GetUserById } from '../user/get-user-by-id.usecase';
import { EnrollmentRepository } from 'src/data/enrollment.repository';
import { GetEnrollmentById } from './get-enrollment-by-id.usecase';
import { Enrollment } from 'src/domain/models/enrollment.model';
import { GetCourseById } from '../course/get-course-by-id.usecase';

@Injectable()
export class UpdateEnrollment {
  constructor(
    private readonly repository: EnrollmentRepository,
    private readonly getEnrollmentById: GetEnrollmentById,
    private readonly getUserById: GetUserById,
    private readonly getCourseById: GetCourseById,
  ) {}

  async execute(
    id: number,
    data: Enrollment,
    userId: number,
    courseId: number,
  ) {
    const enrollment = await this.getEnrollmentById.execute(id);

    if (!enrollment) {
      return null;
    }

    enrollment.reasons = data.reasons;
    enrollment.date = data.date;
    enrollment.price = data.price;

    const student = await this.getUserById.execute(userId);
    enrollment.student = student!!;

    const course = await this.getCourseById.execute(userId);
    enrollment.course = course!!;

    await this.repository.update(enrollment);

    return enrollment;
  }
}
