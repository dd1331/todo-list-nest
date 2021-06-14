import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { BaseTodoRefiner } from './base-refiner';
import { MaximizedTodoDto } from './maximized-todo.dto';

export type EditableProperty = 'originalProperty' | 'editedProperty';

@Injectable()
export class TodoDtoMaximizer extends BaseTodoRefiner {
  constructor() {
    super('TodoDtoMaximizer', 'originalProperty');
  }
  processJobs(todos: Todo[]): TodoDto[] {
    const result = this.addAdditionalProperty(todos);

    console.log(`${this.processorName}'s work is done`);

    return result;
  }

  private addAdditionalProperty(todos: Todo[]): MaximizedTodoDto[] {
    console.log(`${this.processorName}'s work in progress`);

    const todoDtos: MaximizedTodoDto[] = [];
    todos.map((todo, index) => {
      todoDtos.push({
        ...todo,
        additionalProperty: `additionalProperty + index ${index}`,
      });
    });
    return todoDtos;
  }
}
