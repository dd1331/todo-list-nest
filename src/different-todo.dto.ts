import { CommonDto } from './common.dto';

export class DifferentTodoDto extends CommonDto {
  subject: string;

  detail: string;

  status: string;
}
