import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatTodoDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string
	
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	content: string
}