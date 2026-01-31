import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GetUserByCode } from "src/domain/usecases/user/get-user-by-code.usecase";

@Injectable()
@ValidatorConstraint()
export class UniqueCodeValidator implements ValidatorConstraintInterface {
    constructor(private readonly getUserByCode: GetUserByCode) {}

    async validate(code: number, args?: ValidationArguments): Promise<boolean> {
        const user = await this.getUserByCode.execute(code);

        return user === undefined;
    }
    defaultMessage?(args?: ValidationArguments): string {
        return `Ya existe un usuario con el código "${args?.value}".`;
    }
}

export function UniqueCode(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [],
            validator: UniqueCodeValidator,
        })
    }
}