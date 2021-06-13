import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}
  getTodoList(): string {
    return 'Hello World!';
  }
  async createTodo(dto: CreateTodoDto): Promise<Todo> {
    const todo = await this.todoRepo.create(dto);
    await todo.save();
    if (!todo)
      throw new HttpException(
        '할일 추가에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return todo;
  }
  getTodo(id: string): string {
    return 'Hello World!';
  }
  toggleTodoStatus(id: string): string {
    return 'Hello World!';
  }
  deleteTodo(id: string): string {
    return 'Hello World!';
  }
}
