import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { CourseModule } from './course.module';
import { EnrollmentController } from 'src/infraestructure/enrollment/enrollment.controller';
import { EnrollmentRepository } from 'src/data/enrollment.repository';
import { CreateEnrollment } from 'src/domain/usecases/enrollment/create-enrollment.usecase';
import { GetEnrollmentById } from 'src/domain/usecases/enrollment/get-enrollment-by-id.usecase';
import { GetAllEnrollments } from 'src/domain/usecases/enrollment/get-all-enrollment.usecase';
import { UpdateEnrollment } from 'src/domain/usecases/enrollment/update-enrollment.usecase';
import { DeleteEnrollment } from 'src/domain/usecases/enrollment/delete-enrollment.usecase';
import { IsEnrollemntIdValidator } from '../infraestructure/enrollment/validation/is-enrollment-id.validator';
import { IsUniqueEnrollmentValidator } from '../infraestructure/enrollment/validation/is-unique-enrollment.validation';
import { GetEnrollmentByUserAndCourse } from '../domain/usecases/enrollment/get-enrollment-by-user-and-course.usecase';

@Module({
  imports: [UserModule, CourseModule],
  providers: [
    EnrollmentRepository,
    CreateEnrollment,
    GetEnrollmentById,
    GetAllEnrollments,
    UpdateEnrollment,
    DeleteEnrollment,
    GetEnrollmentByUserAndCourse,
    IsEnrollemntIdValidator,
    IsUniqueEnrollmentValidator,
  ],
  controllers: [EnrollmentController],
  exports: [GetEnrollmentById, IsEnrollemntIdValidator],
})
export class EnrollmentModule {}
