import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatTodoDto } from './create-todo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos')
  getTodoList(): string {
    return this.appService.getTodoList();
  }
  
  @Post('/todos')
  createTodoItem(@Body() dto: CreatTodoDto): string {
    // console.log(dto)
    return this.appService.createTodoItem(dto);
  }

  @Get('/todos/:id')
  getTodoItem(@Param('id') id: string): string {
    return this.appService.getTodoItem(id);
  }
  
  @Put('/todos/:id')
  toggleTodoStatus(@Param('id') id: string): string {
    return this.appService.toggleTodoStatus(id);
  }

  @Delete('/todos/:id')
  deleteTodoItem(@Param('id') id: string): string {
    return this.appService.deleteTodoItem(id);
  }
  
}
