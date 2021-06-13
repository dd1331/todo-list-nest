import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Todo extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 'todo' })
  status: string;
}
