import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isCurrentYear', async: false })
@Injectable()
export class isCurrentYearConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string) {
    const propertyDate = dayjs(propertyValue);
    return propertyDate.year() === dayjs().year();
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" should be the date of this year`;
  }
}

export function isCurrentYear<T>(validationOptions?: ValidationOptions) {
  return (object: T, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: isCurrentYearConstraint,
    });
  };
}
