import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/data/course.repository';

@Injectable()
export class GetCourseById {
  constructor(private readonly repository: CourseRepository) {}

  async execute(id: number) {
    const course = await this.repository.findById(id);

    return course;
  }
}
