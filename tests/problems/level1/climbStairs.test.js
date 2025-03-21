const { climbStairs, climbStairsOptimized } = require('../../../src/algorithms/problems/level1/climbStairs');

describe('계단 오르기 문제 테스트', () => {
  // 기본 구현 테스트
  describe('기본 구현 테스트', () => {
    test('n=1인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(1)).toBe(1);
    });
    
    test('n=2인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(2)).toBe(2);
    });
    
    test('n=3인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(3)).toBe(3);
      // 가능한 조합: (1,1,1), (1,2), (2,1)
    });
    
    test('n=4인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(4)).toBe(5);
      // 가능한 조합: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2)
    });
    
    test('n=5인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(5)).toBe(8);
    });
    
    test('n=10인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(10)).toBe(89);
    });
    
    test('n=20인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairs(20)).toBe(10946);
    });
  });
  
  // 최적화 구현 테스트
  describe('최적화 구현 테스트', () => {
    test('n=1인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(1)).toBe(1);
    });
    
    test('n=2인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(2)).toBe(2);
    });
    
    test('n=3인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(3)).toBe(3);
    });
    
    test('n=4인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(4)).toBe(5);
    });
    
    test('n=5인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(5)).toBe(8);
    });
    
    test('n=10인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(10)).toBe(89);
    });
    
    test('n=20인 경우 정확한 결과를 반환해야 함', () => {
      expect(climbStairsOptimized(20)).toBe(10946);
    });
  });
  
  // 두 구현의 결과가 일치하는지 테스트
  describe('두 구현의 결과 일치 테스트', () => {
    const testCases = [1, 2, 3, 5, 8, 13, 21, 30];
    
    testCases.forEach(n => {
      test(`n=${n}인 경우 두 구현의 결과가 일치해야 함`, () => {
        expect(climbStairs(n)).toBe(climbStairsOptimized(n));
      });
    });
  });
}); 