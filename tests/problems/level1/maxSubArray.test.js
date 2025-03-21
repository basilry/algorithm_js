const { maxSubArray, maxSubArrayWithIndices } = require('../../../src/algorithms/problems/level1/maxSubArray');

describe('최대 부분합 문제 테스트', () => {
  describe('maxSubArray 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      expect(maxSubArray(nums)).toBe(6); // 부분배열 [4, -1, 2, 1]의 합
    });
    
    test('예제 2: 모든 요소가 양수인 경우', () => {
      const nums = [1, 2, 3, 4, 5];
      expect(maxSubArray(nums)).toBe(15); // 전체 배열의 합
    });
    
    test('예제 3: 모든 요소가 음수인 경우', () => {
      const nums = [-1, -2, -3, -4, -5];
      expect(maxSubArray(nums)).toBe(-1); // 가장 큰 요소 하나
    });
    
    test('예제 4: 단일 요소 배열', () => {
      expect(maxSubArray([42])).toBe(42);
    });
    
    test('예제 5: 빈 배열', () => {
      expect(maxSubArray([])).toBe(0);
    });
    
    test('예제 6: 0이 포함된 경우', () => {
      const nums = [-2, 0, -1];
      expect(maxSubArray(nums)).toBe(0);
    });
  });
  
  describe('maxSubArrayWithIndices 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const result = maxSubArrayWithIndices(nums);
      
      expect(result.maxSum).toBe(6);
      
      // 부분배열 인덱스 검증
      const subArray = nums.slice(result.start, result.end + 1);
      expect(subArray.reduce((sum, num) => sum + num, 0)).toBe(6);
    });
    
    test('예제 2: 모든 요소가 양수인 경우', () => {
      const nums = [1, 2, 3, 4, 5];
      const result = maxSubArrayWithIndices(nums);
      
      expect(result.maxSum).toBe(15);
      expect(result.start).toBe(0);
      expect(result.end).toBe(4);
    });
    
    test('예제 3: 모든 요소가 음수인 경우', () => {
      const nums = [-1, -2, -3, -4, -5];
      const result = maxSubArrayWithIndices(nums);
      
      expect(result.maxSum).toBe(-1);
      expect(result.start).toBe(0);
      expect(result.end).toBe(0);
    });
    
    test('예제 4: 단일 요소 배열', () => {
      const result = maxSubArrayWithIndices([42]);
      
      expect(result.maxSum).toBe(42);
      expect(result.start).toBe(0);
      expect(result.end).toBe(0);
    });
    
    test('예제 5: 빈 배열', () => {
      const result = maxSubArrayWithIndices([]);
      
      expect(result.maxSum).toBe(0);
      expect(result.start).toBe(-1);
      expect(result.end).toBe(-1);
    });
  });
}); 