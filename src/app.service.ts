import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { Repository, DeleteResult } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TODO_NOT_FOUND } from './http-messages';
import { TodoDtoMiniimizer } from './todo-dto-minimizer';
import { TodoDtoMaximizer } from './todo-dto-maximizer';
import { DifferentTodoDto } from './different-todo.dto';
import { TodoFormatAdapter } from './todo-format-adapter';
import { TodoDto } from './todo.dto';
import { MinimizedTodoDto } from './minimized-todo.dto';
import { RefinerFactory } from './refiner-factory';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private readonly todoDtoMiniimizer: TodoDtoMiniimizer,
    private readonly todoDtoMaximizer: TodoDtoMaximizer,
    private readonly todoFormatAdapter: TodoFormatAdapter,
    private readonly refinerFactory: RefinerFactory,
  ) {}
  async getTodoList(): Promise<TodoDto[]> {
    const todos: Todo[] = await this.todoRepo.find();
    const todoDtos: TodoDto[] = this.processTodos(todos);

    return todoDtos;
  }
  processTodos(todos: Todo[]): TodoDto[] {
    return this.todoDtoMaximizer.processJobs(todos);
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
  async getTodoOrFail(id: string): Promise<Todo> {
    const todo = await this.todoRepo.findOne(id);

    if (!todo) throw new HttpException(TODO_NOT_FOUND, HttpStatus.BAD_REQUEST);

    return todo;
  }

  async getTodoDetail(id: string): Promise<TodoDto> {
    const todo: Todo = await this.getTodoOrFail(id);

    return todo;
  }

  async getTodoSimpleDetail(id: string): Promise<MinimizedTodoDto> {
    const todo: TodoDto = await this.getTodoOrFail(id);
    const [result] = this.todoDtoMiniimizer.processJobs([todo]);
    return result;
  }

  async getTodoDetailInDifferentFormat(id: string): Promise<TodoDto> {
    const todo: Todo = await this.getTodoOrFail(id);
    const { title, content, ...rest } = todo;
    const sampleDifferentTodoDto: DifferentTodoDto[] = [
      {
        subject: title,
        detail: content,
        ...rest,
      },
    ];
    const [result]: TodoDto[] = this.todoFormatAdapter.processJobs(
      sampleDifferentTodoDto,
    );
    return result;
  }
  async getTodoSimpleDetailWithDifferentFormat(
    id: string,
  ): Promise<MinimizedTodoDto> {
    const todo: Todo = await this.getTodoOrFail(id);
    const { title, content, ...rest } = todo;
    const sampleDifferentTodoDto: DifferentTodoDto[] = [
      {
        subject: title,
        detail: content,
        ...rest,
      },
    ];
    this.refinerFactory.setRefiners([
      this.todoFormatAdapter,
      this.todoDtoMiniimizer,
    ]);
    const refiner = this.refinerFactory.getRefiner();
    const [result] = refiner(sampleDifferentTodoDto);

    return result;
  }

  async toggleTodoStatus(id: string): Promise<Todo> {
    const todo = await this.getTodoOrFail(id);

    if (todo.status === 'todo') todo.status = 'done';
    else todo.status = 'todo';

    await todo.save();

    return todo;
  }
  async deleteTodo(id: string): Promise<number> {
    await this.getTodoOrFail(id);

    const result: DeleteResult = await this.todoRepo.delete(id);

    if (!result.affected)
      throw new HttpException(
        '할일 삭제에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return result.affected;
  }
}
