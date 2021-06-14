import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { MinimizedTodoDto } from './minimized-todo.dto';
import { DifferentTodoDto } from './different-todo.dto';

export type EditableProperty = 'originalProperty' | 'editedProperty';

export interface ITodoRefiner {
  getProcessorName(): string;
  processJobs(
    todos: Todo[] | DifferentTodoDto[],
  ): TodoDto[] | MinimizedTodoDto[];
}
