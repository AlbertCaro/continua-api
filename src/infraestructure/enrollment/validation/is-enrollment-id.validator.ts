import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GetEnrollmentById } from '../../../domain/usecases/enrollment/get-enrollment-by-id.usecase';

@Injectable()
@ValidatorConstraint({ name: 'IsEnrollemntId', async: true })
export class IsEnrollemntIdValidator implements ValidatorConstraintInterface {
  constructor(private readonly getEnrollmentById: GetEnrollmentById) {}

  async validate(id: number, _?: ValidationArguments): Promise<boolean> {
    const enrollment = await this.getEnrollmentById.execute(id);

    return enrollment !== undefined;
  }
  defaultMessage?(_?: ValidationArguments): string {
    return `La inscripcion especificada no existe.`;
  }
}

export function IsEnrollemntId(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsEnrollemntIdValidator,
    });
  };
}
