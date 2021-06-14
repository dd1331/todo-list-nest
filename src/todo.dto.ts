import { CommonDto } from './common.dto';

export class TodoDto extends CommonDto {
  title: string;

  content: string;

  status: string;
}
