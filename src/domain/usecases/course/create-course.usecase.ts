import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/data/course.repository';
import { Course } from 'src/domain/models/course.model';
import { GetUserById } from '../user/get-user-by-id.usecase';

@Injectable()
export class CreateCourse {
  constructor(
    private readonly repository: CourseRepository,
    private readonly getUserById: GetUserById,
  ) {}

  async execute(course: Course, userId: number) {
    const user = await this.getUserById.execute(userId);

    course.coordinator = user!;

    return await this.repository.create(course);
  }
}
