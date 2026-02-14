import { Module } from '@nestjs/common';
import { CommonModule } from './common.module';
import { UserModule } from './user.module';
import { CourseRepository } from 'src/data/course.repository';
import { CourseController } from 'src/infraestructure/course/course.controller';
import { CreateCourse } from 'src/domain/usecases/course/create-course.usecase';
import { GetCourseById } from 'src/domain/usecases/course/get-course-by-id.usecase';
import { GetAllCourses } from 'src/domain/usecases/course/get-all-courses.usecase';
import { UpdateCourse } from 'src/domain/usecases/course/update-course.usecase';
import { DeleteCourse } from 'src/domain/usecases/course/delete-course.usecase';
import { IsCourseIdValidator } from 'src/infraestructure/course/validation/is-course-id.validator';

@Module({
  imports: [CommonModule, UserModule],
  providers: [
    CourseRepository,
    CreateCourse,
    GetCourseById,
    GetAllCourses,
    UpdateCourse,
    DeleteCourse,
    IsCourseIdValidator,
  ],
  controllers: [CourseController],
  exports: [IsCourseIdValidator, GetCourseById],
})
export class CourseModule {}
