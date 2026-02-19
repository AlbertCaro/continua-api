import { Injectable } from '@nestjs/common';
import { GetUserById } from '../user/get-user-by-id.usecase';
import { EnrollmentRepository } from 'src/data/enrollment.repository';
import { Enrollment } from 'src/domain/models/enrollment.model';
import { GetCourseById } from '../course/get-course-by-id.usecase';

@Injectable()
export class CreateEnrollment {
  constructor(
    private readonly repository: EnrollmentRepository,
    private readonly getUserById: GetUserById,
    private readonly getCourseById: GetCourseById,
  ) {}

  async execute(enrollment: Enrollment, studentId: number, courseId: number) {
    const student = await this.getUserById.execute(studentId);
    const course = await this.getCourseById.execute(studentId);

    enrollment.student = student!;
    enrollment.course = course!;

    return await this.repository.create(enrollment);
  }
}
