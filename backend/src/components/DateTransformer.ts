import { TransformFnParams } from 'class-transformer';
import * as dayjs from 'dayjs';

export default ({ value }: TransformFnParams) => dayjs(value).format('YYYY-MM-DD');
