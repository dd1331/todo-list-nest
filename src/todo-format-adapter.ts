import { Injectable } from '@nestjs/common';
import { DifferentTodoDto } from './different-todo.dto';
import { TodoDto } from './todo.dto';
import { ITodoRefiner } from './todo-refiner.interface';

@Injectable()
export class TodoFormatAdapter implements ITodoRefiner {
  private adapterName = 'TodoFormatAdapter';
  private type = 'originalType';
  getProcessorName() {
    return this.adapterName;
  }
  processJobs(todos: DifferentTodoDto[]): TodoDto[] {
    console.log(`${this.adapterName}'s work is in progress`);

    console.log(`${this.adapterName}'s work is done`);

    return this.changeFormat(todos);
  }

  private changeFormat(todos: DifferentTodoDto[]): TodoDto[] {
    console.log('execute first internal method and ');

    // an error condition that never gets fired
    const condition = false;

    if (condition) throw new Error('an error was thrown');

    const todoDtos: TodoDto[] = [];
    todos.map((todo) => {
      this.validateOrFail(todo.subject);
      const { subject, detail, ...rest } = todo;

      const payload: TodoDto = {
        title: subject,
        content: detail,
        ...rest,
      };

      todoDtos.push(payload);
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
