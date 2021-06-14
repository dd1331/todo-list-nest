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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,

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
