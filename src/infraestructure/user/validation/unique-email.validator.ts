import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { GetUserByEmail } from 'src/domain/usecases/user/get-user-by-email.usecase';
import { UserWriteDto } from '../dto/user-write.dto';

@Injectable()
@ValidatorConstraint()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly getUserByEmail: GetUserByEmail) {}

  async validate(email: string, args?: ValidationArguments): Promise<boolean> {
    const user = await this.getUserByEmail.execute(email);

    const body: UserWriteDto = args?.object as any;

    if (user?.id === body.id) {
      return true;
    }

    return user === undefined;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `Ya existe un usuario con el correo "${args?.value}".`;
  }
}

export function UniqueEmail(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
}
