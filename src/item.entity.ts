
import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Item extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: boolean;

}
