import { Injectable } from '@nestjs/common';
import { EnrollmentRepository } from 'src/data/enrollment.repository';

@Injectable()
export class GetEnrollmentById {
  constructor(private readonly repository: EnrollmentRepository) {}

  async execute(id: number) {
    const enrollment = await this.repository.findById(id);

    return enrollment;
  }
}
