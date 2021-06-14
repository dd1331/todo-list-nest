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
import { TodoDto } from './todo.dto';
import { MinimizedTodoDto } from './minimized-todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  getTodoList(): Promise<TodoDto[]> {
    return this.appService.getTodoList();
  }

  @Post('/todos')
  createTodo(@Body() dto: CreateTodoDto): Promise<Todo> {
    return this.appService.createTodo(dto);
  }

  @Get('/todos/:id')
  getTodoDetail(@Param('id') id: string): Promise<TodoDto> {
    return this.appService.getTodoDetail(id);
  }
  @Get('/todos-simple/:id')
  getTodoSimpleDetail(@Param('id') id: string): Promise<MinimizedTodoDto> {
    return this.appService.getTodoSimpleDetail(id);
  }
  @Get('/todos-different/:id')
  getTodoDetailWithDifferentFormat(@Param('id') id: string): Promise<TodoDto> {
    return this.appService.getTodoDetailInDifferentFormat(id);
  }

  @Get('/todos-simple-different/:id')
  getTodoSimpleDetailWithDifferentFormat(
    @Param('id') id: string,
  ): Promise<MinimizedTodoDto> {
    return this.appService.getTodoSimpleDetailWithDifferentFormat(id);
  }

  @Put('/todos/:id')
  toggleTodoStatus(@Param('id') id: string): Promise<Todo> {
    return this.appService.toggleTodoStatus(id);
  }

  @Delete('/todos/:id')
  deleteTodo(@Param('id') id: string): Promise<number> {
    return this.appService.deleteTodo(id);
  }
}
