const { lengthOfLIS, lengthOfLISOptimized, findLIS } = require('../../../src/problems/level3/lis');

describe('최장 증가 부분 수열(LIS) 문제 테스트', () => {
  describe('기본 lengthOfLIS 함수 테스트', () => {
    test('기본 테스트 케이스', () => {
      const nums = [10, 9, 2, 5, 3, 7, 101, 18];
      expect(lengthOfLIS(nums)).toBe(4); // 2, 3, 7, 18 또는 2, 3, 7, 101
    });
    
    test('이미 정렬된 배열', () => {
      const nums = [1, 2, 3, 4, 5];
      expect(lengthOfLIS(nums)).toBe(5); // 전체 배열이 LIS
    });
    
    test('역순 배열', () => {
      const nums = [5, 4, 3, 2, 1];
      expect(lengthOfLIS(nums)).toBe(1); // 각 숫자는 길이가 1인 LIS
    });
    
    test('중복된 숫자가 있는 배열', () => {
      const nums = [1, 3, 5, 4, 7, 7, 8];
      expect(lengthOfLIS(nums)).toBe(5); // 1, 3, 4, 7, 8
    });
    
    test('빈 배열', () => {
      expect(lengthOfLIS([])).toBe(0);
    });
    
    test('단일 요소 배열', () => {
      expect(lengthOfLIS([42])).toBe(1);
    });
  });
  
  describe('최적화된 lengthOfLISOptimized 함수 테스트', () => {
    test('기본 테스트 케이스', () => {
      const nums = [10, 9, 2, 5, 3, 7, 101, 18];
      expect(lengthOfLISOptimized(nums)).toBe(4);
    });
    
    test('이미 정렬된 배열', () => {
      const nums = [1, 2, 3, 4, 5];
      expect(lengthOfLISOptimized(nums)).toBe(5);
    });
    
    test('역순 배열', () => {
      const nums = [5, 4, 3, 2, 1];
      expect(lengthOfLISOptimized(nums)).toBe(1);
    });
    
    test('중복된 숫자가 있는 배열', () => {
      const nums = [1, 3, 5, 4, 7, 7, 8];
      expect(lengthOfLISOptimized(nums)).toBe(5);
    });
    
    test('빈 배열', () => {
      expect(lengthOfLISOptimized([])).toBe(0);
    });
    
    test('단일 요소 배열', () => {
      expect(lengthOfLISOptimized([42])).toBe(1);
    });
  });
  
  describe('두 구현의 결과 일치 테스트', () => {
    const testCases = [
      [10, 9, 2, 5, 3, 7, 101, 18],
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [1, 3, 5, 4, 7],
      [2, 2, 2, 2],
      [4, 10, 4, 3, 8, 9],
      [3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12]
    ];
    
    testCases.forEach((nums, index) => {
      test(`테스트 케이스 ${index + 1}: 두 구현의 결과가 일치해야 함`, () => {
        expect(lengthOfLIS(nums)).toBe(lengthOfLISOptimized(nums));
      });
    });
  });
  
  describe('findLIS 함수 테스트', () => {
    test('기본 테스트 케이스', () => {
      const nums = [10, 9, 2, 5, 3, 7, 101, 18];
      const lis = findLIS(nums);
      
      // 길이 확인
      expect(lis.length).toBe(4);
      
      // 각 요소가 증가하는지 확인
      for (let i = 1; i < lis.length; i++) {
        expect(lis[i]).toBeGreaterThan(lis[i - 1]);
      }
      
      // 모든 요소가 원본 배열에 있는지 확인
      lis.forEach(num => {
        expect(nums).toContain(num);
      });
    });
    
    test('여러 가능한 LIS 중 하나 반환 확인', () => {
      const nums = [3, 1, 4, 1, 5, 9, 2, 6];
      const lis = findLIS(nums);
      
      // 가능한 LIS 길이는 4
      expect(lis.length).toBe(4);
      
      // 각 요소가 증가하는지 확인
      for (let i = 1; i < lis.length; i++) {
        expect(lis[i]).toBeGreaterThan(lis[i - 1]);
      }
    });
    
    test('이미 정렬된 배열', () => {
      const nums = [1, 2, 3, 4, 5];
      const lis = findLIS(nums);
      
      expect(lis).toEqual([1, 2, 3, 4, 5]);
    });
    
    test('역순 배열', () => {
      const nums = [5, 4, 3, 2, 1];
      const lis = findLIS(nums);
      
      // 길이가 1인 LIS 중 하나
      expect(lis.length).toBe(1);
      expect(nums).toContain(lis[0]);
    });
    
    test('빈 배열', () => {
      expect(findLIS([])).toEqual([]);
    });
  });
}); 