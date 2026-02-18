import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/data/course.repository';
import { GetCourseById } from './get-course-by-id.usecase';

@Injectable()
export class DeleteCourse {
  constructor(
    private readonly repository: CourseRepository,
    private readonly getUserById: GetCourseById,
  ) {}

  async execute(id: number) {
    const course = await this.getUserById.execute(id);

    if (!course) {
      return null;
    }

    await this.repository.delete(course);

    return course;
  }
}
