import { TransformFnParams } from 'class-transformer';

export default ({ value }: TransformFnParams) => (value as string).substring(0, 10);
