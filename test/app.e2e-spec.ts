import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import each from 'jest-each';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let agent;

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
  })

  it('GET /todos: 투두 리스트', async () => {
    const res = await request(agent).get('/todos').expect(HttpStatus.OK)
  })

  it('POST /todos: 투두 만들기', async () => {
    const payload = { title: '제목', content: '내용'}
    const res = await request(agent).post('/todos').send(payload).expect(HttpStatus.CREATED)
  })

  it('GET /todos/:id: 투두 디테일 데이터 가져오기', async () => {
    const id = 1
    const res = await request(agent).get(`/todos/${id}`).expect(HttpStatus.OK)
  })

  it('PUT /todos/:id: 투두 디테일 상태 변경 (완료, 미완료)', async () => {
    const id = 1
    const res = await request(agent).put(`/todos/${id}`).expect(HttpStatus.OK)
  })
  
  it('DELETE /todos/:id: 투두 삭제', async () => {
    const id = 1
    const res = await request(agent).delete(`/todos/${id}`).expect(HttpStatus.OK)
  })
});
