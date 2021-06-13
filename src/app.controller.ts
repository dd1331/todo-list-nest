import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  getTodoList(): Promise<Todo[]> {
    return this.appService.getTodoList();
  }

  @Post('/todos')
  createTodo(@Body() dto: CreateTodoDto): Promise<Todo> {
    return this.appService.createTodo(dto);
  }

  @Get('/todos/:id')
  getTodo(@Param('id') id: string): Promise<Todo> {
    return this.appService.getTodo(id);
  }

  @Put('/todos/:id')
  toggleTodoStatus(@Param('id') id: string): string {
    return this.appService.toggleTodoStatus(id);
  }

  @Delete('/todos/:id')
  deleteTodo(@Param('id') id: string): string {
    return this.appService.deleteTodo(id);
  }
}
