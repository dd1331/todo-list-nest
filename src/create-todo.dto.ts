import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TITLE_REQUIRED, CONTENT_REQUIRED } from './http-messages';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: TITLE_REQUIRED })
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: CONTENT_REQUIRED })
  content: string;
}
