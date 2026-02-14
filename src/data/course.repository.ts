import { Course } from 'src/domain/models/course.model';
import { Curso } from './database/entity/course.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseRepository {
  async create(course: Course) {
    const entity = course.toDatabase();

    await entity.save();

    return entity.toDomain();
  }

  async findById(id: number) {
    return (
      await Curso.findOne({
        where: { id },
        relations: ['coordinador'],
      })
    )?.toDomain();
  }

  async findAll() {
    const courses = await Curso.find({ relations: ['coordinador'] });

    return courses.map((course) => course.toDomain());
  }

  async update(course: Course) {
    const entity = course.toDatabase();

    await entity.save();
  }

  async delete(course: Course) {
    const entity = course.toDatabase();

    await entity.remove();
  }
}
