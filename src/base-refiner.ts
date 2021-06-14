import { Injectable } from '@nestjs/common';
import { ITodoRefiner, EditableProperty } from './todo-refiner.interface';
import { TodoDto } from './todo.dto';
import { MinimizedTodoDto } from './minimized-todo.dto';
import { DifferentTodoDto } from './different-todo.dto';

@Injectable()
export abstract class BaseTodoRefiner implements ITodoRefiner {
  constructor(
    protected readonly processorName: string,
    protected editableProperty: EditableProperty,
  ) {}
  getProcessorName() {
    return this.processorName;
  }
  setEditiableProperty(param: EditableProperty) {
    this.editableProperty = param;
  }
  abstract processJobs(
    todos: TodoDto[] | DifferentTodoDto[],
  ): TodoDto[] | MinimizedTodoDto[];
}
