import { Injectable } from '@nestjs/common';
import { EnrollmentRepository } from '../../../data/enrollment.repository';

@Injectable()
export class GetEnrollmentByUserAndCourse {
  constructor(private readonly repository: EnrollmentRepository) {}

  async execute(userId: number, courseId: number) {
    return await this.repository.findByUserAndCourse(userId, courseId);
  }
}
