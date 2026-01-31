import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "PasswordMatch" })
export class PasswordMatchValidator implements ValidatorConstraintInterface {
    validate(password: string, args?: ValidationArguments): boolean {
        const user: any = args?.object;

        return password === user.confirmPassword
    }
    defaultMessage?(args?: ValidationArguments): string {
        return "Las contraseñas no coinciden"
    }
}

export function PasswordMatch(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [],
            validator: PasswordMatchValidator,
        })
    }
}