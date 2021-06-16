
## 설명

TDD/OOP/NESTJS 활용 TODO-LIST API SERVER

## 설치

```bash
$ npm install
```

## 환경변수
* 아래 예제를 참고하여 .env파일을 최상위 경로에 작성하여 로컬 데이터베이스 정보를 적용한다.

```
// .env_sample

DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=charlie
DATABASE_PASSWORD=1331
DATABASE_NAME=todo_list_nest

```

## 실행

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## 테스트

```bash
$ npm run test

# watch mode
$ npm run test:watch
```

## API 정보 (Swagger)
* 서버 실행 후 http://localhost:3000/api/ 접속

## 기타
* TDD의 red-refactor-green 방법론을 활용하여 실패하는 코드 작성 -> 최소한의 로직구현으로 성공 -> 리팩터 사이클을 순환하며 구현
* 최소한의 요구사항 만족을 위한 코드작성시 Nest.js framework에서 활용되는 OOP개념을 기본적으로 활용
* 프레임워크에 의존하지 않고 자체적인 OOP 활용을 위해 프레임워크 컨벤션에 따르지 않는 명시적 코드 작성
  * 상속, 캡슐화, 추상화, 다형성, 인터페이스, 의존성주입 활용

