import { Injectable } from '@nestjs/common';
import { CreatTodoDto } from './create-todo.dto';

@Injectable()
export class AppService {
  getTodoList(): string {
    return 'Hello World!';
  }
  createTodoItem(dto: CreatTodoDto): string {
    return 'Hello World!';
  }
  getTodoItem(id: string): string {
    return 'Hello World!';
  }
  toggleTodoStatus(id: string): string {
    return 'Hello World!';
  }
  deleteTodoItem(id: string): string {
    return 'Hello World!';
  }
}
