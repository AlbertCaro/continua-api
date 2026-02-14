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

@Module({
  imports: [UserModule, CourseModule],
  providers: [
    EnrollmentRepository,
    CreateEnrollment,
    GetEnrollmentById,
    GetAllEnrollments,
    UpdateEnrollment,
    DeleteEnrollment,
  ],
  controllers: [EnrollmentController],
  exports: [GetEnrollmentById],
})
export class EnrollmentModule {}
