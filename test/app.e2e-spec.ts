import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import each from 'jest-each';
import { Todo } from 'src/todo.entity';
import { CreateTodoDto } from 'src/create-todo.dto';
import { CONTENT_REQUIRED, TITLE_REQUIRED } from '../src/http-messages';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let agent;
  const createdTodos: Todo[] = [];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    agent = app.getHttpServer();
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });

  describe('POST /todos: 투두 만들기', () => {
    const validCreateParams: CreateTodoDto[] = [
      { title: '제목1', content: '내용1' },
      { title: '제목2', content: '내용2' },
    ];
    each(validCreateParams).it(
      'POST /todos: 투두 만들기 성공',
      async (payload) => {
        const STATUS = 'todo';
        const { body } = await request(agent)
          .post('/todos')
          .send(payload)
          .expect(HttpStatus.CREATED);
        expect(body).toEqual(expect.objectContaining(payload));
        expect(body.status).toEqual(STATUS);

        createdTodos.push(body);
      },
    );
    const invalidCreateParams: (CreateTodoDto & { message: string })[] = [
      { title: '제목1', content: '', message: CONTENT_REQUIRED },
      { title: '', content: '내용2', message: TITLE_REQUIRED },
    ];
    each(invalidCreateParams).it(
      'POST /todos: 투두 만들기 실패',
      async (payload) => {
        const { body } = await request(agent)
          .post('/todos')
          .send(payload)
          .expect(HttpStatus.BAD_REQUEST);
        expect(body.message).toContain(payload.message);
      },
    );
  });
  describe('GET /todos: 투두 리스트', () => {
    it('GET /todos: 투두 리스트 가져오기 성공', async () => {
      const { body } = await request(agent).get('/todos').expect(HttpStatus.OK);

      expect(body).toHaveLength(createdTodos.length);
      expect(body).toEqual(createdTodos);
    });
  });

  describe('GET /todos/:id: 투두 디테일 데이터 가져오기', () => {
    it('GET /todos/:id: 투두 디테일 데이터 가져오기 성공', async () => {
      const { id } = createdTodos[0];
      const { body } = await request(agent)
        .get(`/todos/${id}`)
        .expect(HttpStatus.OK);
      expect(body).toEqual(createdTodos[0]);
    });

    const invalidIdParams = [-3, '-3', 'test', 0, null];
    each(invalidIdParams).it(
      'GET /todos/:id: 투두 디테일 데이터 가져오기 실패',
      async (id) => {
        await request(agent).get(`/todos/${id}`).expect(HttpStatus.BAD_REQUEST);
      },
    );
  });

  describe('PUT /todos/:id: 투두 디테일 상태 변경 (완료, 미완료)', () => {
    it('PUT /todos/:id: 투두 디테일 상태 변경 성공 ', async () => {
      const { id, status, updatedAt } = createdTodos[0];
      const updatedStatus = status === 'todo' ? 'done' : 'todo';
      const { body } = await request(agent)
        .put(`/todos/${id}`)
        .expect(HttpStatus.OK);
      expect(body.status).toBeDefined();
      expect(body.status).toBe(updatedStatus);
      expect(body.updatedAt).not.toBe(updatedAt);
    });
  });

  describe('DELETE /todos/:id: 투두 삭제', () => {
    const invalidIdParams = [-3, '-3', 'test', 0, null];
    each(invalidIdParams).it(
      'DELETE /todos/:id: 투두 삭제 실패',
      async (id) => {
        await request(agent)
          .delete(`/todos/${id}`)
          .expect(HttpStatus.BAD_REQUEST);
      },
    );
    it('DELETE /todos/:id: 투두 삭제 성공', async () => {
      const { id } = createdTodos[0];
      const { text } = await request(agent)
        .delete(`/todos/${id}`)
        .expect(HttpStatus.OK);
      expect(text).toBe('1');
    });
  });
});
