import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isAfterDate', async: false })
@Injectable()
export class IsAfterDateConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    const propertyDate = dayjs(propertyValue);
    const compareDate = dayjs(args.object[args.constraints[0]]);
    return propertyDate.isAfter(compareDate);
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be after "${args.constraints[0]}"`;
  }
}

export function IsAfterDate<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: T, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterDateConstraint,
    });
  };
}
