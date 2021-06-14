import { Injectable } from '@nestjs/common';
import { BaseTodoRefiner } from './base-refiner';
import { TodoDto } from './todo.dto';
import { MinimizedTodoDto } from './minimized-todo.dto';

@Injectable()
export class TodoDtoMiniimizer extends BaseTodoRefiner {
  constructor() {
    super('TodoDtoMiniimizer', 'originalProperty');
  }
  processJobs(todos: TodoDto[]): MinimizedTodoDto[] {
    console.log(`${this.processorName}'s work is in progress`);

    const result: MinimizedTodoDto[] = this.removeContentProperty(todos);

    console.log(`${this.processorName}'s work is done`);
    return result;
  }

  private removeContentProperty(todos: TodoDto[]): MinimizedTodoDto[] {
    console.log('execute first internalmet');

    // an error condition that never gets fired
    const condition = false;

    if (condition) throw new Error('an error was thrown');

    const todoDtos: MinimizedTodoDto[] = [];
    todos.map((todo) => {
      const { content, ...rest } = todo;
      this.validateOrFail(todo.title);
      todoDtos.push({
        ...rest,
      });
    });

    return todoDtos;
  }

  private validateOrFail(title): boolean {
    console.log(`let's say we validation param here and pass`);

    const condition = 'an error condition that never gets fired';

    if (title === condition) throw new Error('an error was thrown');

    return true;
  }
}
