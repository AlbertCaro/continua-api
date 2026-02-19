import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/data/course.repository';
import { GetCourseById } from './get-course-by-id.usecase';
import { Course } from 'src/domain/models/course.model';
import { GetUserById } from '../user/get-user-by-id.usecase';

@Injectable()
export class UpdateCourse {
  constructor(
    private readonly repository: CourseRepository,
    private readonly getCourseById: GetCourseById,
    private readonly getUserById: GetUserById,
  ) {}

  async execute(id: number, data: Course, userId: number) {
    const course = await this.getCourseById.execute(id);

    if (!course) {
      return null;
    }

    course.name = data.name;
    course.shortDescription = data.shortDescription;
    course.description = data.description;
    course.objectives = data.objectives;
    course.duration = data.duration;
    course.startDate = data.startDate;
    course.endDate = data.endDate;
    course.effort = data.effort;
    course.initialCost = data.initialCost;
    course.finalCost = data.finalCost;
    course.topic = data.topic;
    course.nive = data.nive;
    course.capacity = data.capacity;
    course.payment = data.payment;
    course.document = data.document;
    course.info = data.info;
    course.img = data.img;
    course.status = data.status;

    const user = await this.getUserById.execute(userId);

    course.coordinator = user!;

    await this.repository.update(course);

    return course;
  }
}
