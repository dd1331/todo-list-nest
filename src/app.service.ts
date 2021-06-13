import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TODO_NOT_FOUND } from './http-messages';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}
  async getTodoList(): Promise<Todo[]> {
    const todos = await this.todoRepo.find();
    return todos;
  }
  async createTodo(dto: CreateTodoDto): Promise<Todo> {
    const todos = await this.todoRepo.create(dto);
    await todos.save();
    if (!todos)
      throw new HttpException(
        '할일 추가에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return todos;
  }
  async getTodo(id: string): Promise<Todo> {
    console.log(id);
    const todo = await this.todoRepo.findOne(id);

    if (!todo) throw new HttpException(TODO_NOT_FOUND, HttpStatus.BAD_REQUEST);

    return todo;
  }
  toggleTodoStatus(id: string): string {
    return 'Hello World!';
  }
  deleteTodo(id: string): string {
    return 'Hello World!';
  }
}
