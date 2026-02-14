import { Injectable } from '@nestjs/common';
import { EnrollmentRepository } from 'src/data/enrollment.repository';
import { GetEnrollmentById } from './get-enrollment-by-id.usecase';

@Injectable()
export class DeleteEnrollment {
  constructor(
    private readonly repository: EnrollmentRepository,
    private readonly getUserById: GetEnrollmentById,
  ) {}

  async execute(id: number) {
    const enrollment = await this.getUserById.execute(id);

    if (!enrollment) {
      return null;
    }

    await this.repository.delete(enrollment);

    return enrollment;
  }
}
