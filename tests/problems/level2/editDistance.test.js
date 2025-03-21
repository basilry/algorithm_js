const { minDistance, minDistanceWithOperations } = require('../../../src/algorithms/problems/level2/editDistance');

describe('편집 거리 문제 테스트', () => {
  describe('minDistance 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      expect(minDistance('horse', 'ros')).toBe(3);
      // "horse" -> "rorse" (h를 r로 대체)
      // "rorse" -> "rose" (r 삭제)
      // "rose" -> "ros" (e 삭제)
    });
    
    test('예제 2: 두 번째 기본 테스트 케이스', () => {
      expect(minDistance('intention', 'execution')).toBe(5);
      // "intention" -> "inention" (t 삭제)
      // "inention" -> "enention" (i를 e로 대체)
      // "enention" -> "exention" (n을 x로 대체)
      // "exention" -> "exection" (n을 c로 대체)
      // "exection" -> "execution" (c 다음에 u 삽입)
    });
    
    test('예제 3: 동일한 문자열', () => {
      expect(minDistance('same', 'same')).toBe(0);
    });
    
    test('예제 4: 빈 문자열', () => {
      expect(minDistance('', 'abc')).toBe(3); // 3번의 삽입
      expect(minDistance('abc', '')).toBe(3); // 3번의 삭제
      expect(minDistance('', '')).toBe(0);
    });
    
    test('예제 5: 완전히 다른 문자열', () => {
      expect(minDistance('abc', 'xyz')).toBe(3); // 모든 문자 대체
    });
    
    test('예제 6: 하나의 문자열이 다른 문자열의 부분집합', () => {
      expect(minDistance('abc', 'abcdef')).toBe(3); // 3번의 삽입
      expect(minDistance('abcdef', 'abc')).toBe(3); // 3번의 삭제
    });
  });
  
  describe('minDistanceWithOperations 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      const result = minDistanceWithOperations('horse', 'ros');
      
      expect(result.distance).toBe(3);
      expect(result.operations.length).toBe(3);
      
      // 연산의 타입만 검증 (순서는 여러 가지가 가능할 수 있음)
      const operationTypes = result.operations.map(op => op.type);
      expect(operationTypes).toContain('delete');
      expect(operationTypes).toContain('replace');
    });
    
    test('예제 2: 동일한 문자열', () => {
      const result = minDistanceWithOperations('same', 'same');
      
      expect(result.distance).toBe(0);
      expect(result.operations.length).toBe(0);
    });
    
    test('예제 3: 빈 문자열에서 삽입만 필요한 경우', () => {
      const result = minDistanceWithOperations('', 'abc');
      
      expect(result.distance).toBe(3);
      expect(result.operations.length).toBe(3);
      
      // 모든 연산은 삽입이어야 함
      result.operations.forEach(op => {
        expect(op.type).toBe('insert');
      });
      
      // 삽입되는 문자들을 합치면 목표 문자열이 되어야 함
      const insertedChars = result.operations.map(op => op.char).join('');
      expect(insertedChars).toBe('abc');
    });
    
    test('예제 4: 삭제만 필요한 경우', () => {
      const result = minDistanceWithOperations('abc', '');
      
      expect(result.distance).toBe(3);
      expect(result.operations.length).toBe(3);
      
      // 모든 연산은 삭제여야 함
      result.operations.forEach(op => {
        expect(op.type).toBe('delete');
      });
      
      // 삭제되는 문자들을 합치면 원본 문자열이 되어야 함
      const deletedChars = result.operations.map(op => op.char).join('');
      expect(deletedChars).toBe('abc');
    });
  });
}); 