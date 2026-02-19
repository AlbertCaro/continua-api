import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GetEnrollmentByUserAndCourse } from '../../../domain/usecases/enrollment/get-enrollment-by-user-and-course.usecase';
import { EnrollmentDto } from '../dto/enrollment.dto';

@ValidatorConstraint({ name: 'IsUniqueEnrollment' })
export class IsUniqueEnrollmentValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly getEnrollmentByUserAndCourse: GetEnrollmentByUserAndCourse,
  ) {}

  async validate(
    student: number,
    args?: ValidationArguments,
  ): Promise<boolean> {
    const enrollment: any = args?.object as EnrollmentDto;

    const entity = await this.getEnrollmentByUserAndCourse.execute(
      student,
      enrollment.course,
    );

    return entity === null;
  }
  defaultMessage?(_?: ValidationArguments): string {
    return 'El alumno ya se encuentra registrado al curso especificado.';
  }
}

export function IsUniqueEnrollment(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsUniqueEnrollmentValidator,
    });
  };
}
