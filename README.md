# 자바스크립트 알고리즘 풀이

Node.js와 Jest를 사용한 자바스크립트 알고리즘 풀이 프로젝트입니다.

## 구조

```
.
├── src/
│   └── algorithms/          # 알고리즘 구현 파일들
│       └── problems/        # 문제 유형별 구현
│           ├── level1/      # 난이도 1 문제
│           ├── level2/      # 난이도 2 문제
│           └── level3/      # 난이도 3 문제
├── tests/                   # 테스트 파일들
├── problems.md              # 문제 목록 및 상태
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

## 알고리즘 연습 방법

이 프로젝트를 활용하여 알고리즘을 효과적으로 연습하는 방법입니다:

### Git 저장소 초기화 및 브랜치 활용

1. Git 저장소 초기화
   ```bash
   git init
   git add .
   git commit -m "초기 알고리즘 구현 완료"
   ```

2. 연습용 브랜치 생성
   ```bash
   git checkout -b practice
   ```

3. 알고리즘 구현 파일의 내용만 비우고 함수 구조 유지
   ```javascript
   /**
    * 함수 설명
    * @param {타입} 파라미터명 - 설명
    * @return {타입} - 반환값 설명
    */
   function 함수명(파라미터) {
     // 여기에 구현
   }
   
   module.exports = 함수명;
   ```

4. 테스트를 실행하며 구현 
   ```bash
   npm run test:watch
   ```

5. 정답 확인 필요시 master 브랜치 참조
   ```bash
   git checkout master  # 정답 확인
   git checkout practice  # 다시 연습 브랜치로
   ```

### 학습 전략

1. **카테고리별 접근**: problems.md 파일에 정의된 카테고리별로 학습
   - 그래프 탐색(BFS/DFS)
   - 문자열 처리
   - 완전탐색(브루트포스)
   - 동적 계획법(DP)
   - 자료구조 활용

2. **난이도별 접근**: 각 카테고리 내에서 레벨 1부터 시작
   
3. **TDD 방식**: 테스트가 통과할 때까지 구현을 개선

## 구현된 알고리즘

problems.md 파일에서 구현 상태를 확인할 수 있습니다. 