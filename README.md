# 자바스크립트 알고리즘 풀이

Node.js와 Jest를 사용한 자바스크립트 알고리즘 풀이 프로젝트입니다.

## 구조

```
.
├── src/
│   └── algorithms/   # 알고리즘 구현 파일들
├── tests/            # 테스트 파일들
├── package.json
└── README.md
```

## 시작하기

### 설치

```bash
npm install
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 테스트 감시 모드 (파일 변경 시 자동 실행)
npm run test:watch
```

## 구현된 알고리즘

- `sum.js`: 두 수를 더하는 간단한 함수
- `fibonacci.js`: 피보나치 수열의 n번째 값을 계산하는 함수

## 알고리즘 추가 방법

1. `src/algorithms/` 디렉토리에 새 알고리즘 파일 추가
2. `tests/` 디렉토리에 테스트 파일 추가 (파일명.test.js 형식)
3. Jest를 사용하여 테스트 작성
4. `npm test`로 테스트 실행 