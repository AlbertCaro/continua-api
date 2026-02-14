import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GetCourseById } from 'src/domain/usecases/course/get-course-by-id.usecase';

@Injectable()
@ValidatorConstraint({ name: 'IsCourseId', async: true })
export class IsCourseIdValidator implements ValidatorConstraintInterface {
  constructor(private readonly getCourseById: GetCourseById) {}

  async validate(id: number, _?: ValidationArguments): Promise<boolean> {
    const course = await this.getCourseById.execute(id);

    return course !== undefined;
  }
  defaultMessage?(_?: ValidationArguments): string {
    return `El curso especificado no existe.`;
  }
}

export function IsCourseId(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsCourseIdValidator,
    });
  };
}
