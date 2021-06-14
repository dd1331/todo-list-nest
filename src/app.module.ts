import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { Todo } from './todo.entity';
import { TodoDtoMiniimizer } from './todo-dto-minimizer';
import { TodoDtoMaximizer } from './todo-dto-maximizer';
import { TodoFormatAdapter } from './todo-format-adapter';
import { RefinerFactory } from './refiner-factory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'charlie',
      password: '1331',
      database: 'todo_list_nest',
      entities: [Todo],
      synchronize: true,
      keepConnectionAlive: true,
      dropSchema: true,
      // logging: true,
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    TodoDtoMaximizer,
    TodoDtoMiniimizer,
    TodoFormatAdapter,
    RefinerFactory,
  ],
})
export class AppModule {}
