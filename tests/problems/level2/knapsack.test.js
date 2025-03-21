const { knapsack, knapsackOptimized, knapsackWithItems } = require('../../../src/problems/level2/knapsack');

describe('배낭 문제 테스트', () => {
  describe('기본 knapsack 함수 테스트', () => {
    test('기본 테스트 케이스', () => {
      const weights = [2, 3, 4, 5];
      const values = [3, 4, 5, 6];
      const capacity = 8;
      
      expect(knapsack(weights, values, capacity)).toBe(10); // 무게 3과 5인 물건, 가치 합 10
    });
    
    test('모든 물건을 담을 수 있는 경우', () => {
      const weights = [1, 2, 3];
      const values = [6, 10, 12];
      const capacity = 10;
      
      expect(knapsack(weights, values, capacity)).toBe(28); // 모든 물건 담기
    });
    
    test('물건이 없는 경우', () => {
      const weights = [];
      const values = [];
      const capacity = 10;
      
      expect(knapsack(weights, values, capacity)).toBe(0);
    });
    
    test('용량이 0인 경우', () => {
      const weights = [1, 2, 3];
      const values = [6, 10, 12];
      const capacity = 0;
      
      expect(knapsack(weights, values, capacity)).toBe(0);
    });
    
    test('단일 물건만 담을 수 있는 경우', () => {
      const weights = [5, 4, 6];
      const values = [10, 40, 30];
      const capacity = 4;
      
      expect(knapsack(weights, values, capacity)).toBe(40); // 두 번째 물건만 담기
    });
  });
  
  describe('최적화된 knapsackOptimized 함수 테스트', () => {
    test('기본 테스트 케이스', () => {
      const weights = [2, 3, 4, 5];
      const values = [3, 4, 5, 6];
      const capacity = 8;
      
      expect(knapsackOptimized(weights, values, capacity)).toBe(10);
    });
    
    test('모든 물건을 담을 수 있는 경우', () => {
      const weights = [1, 2, 3];
      const values = [6, 10, 12];
      const capacity = 10;
      
      expect(knapsackOptimized(weights, values, capacity)).toBe(28);
    });
    
    test('물건이 없는 경우', () => {
      const weights = [];
      const values = [];
      const capacity = 10;
      
      expect(knapsackOptimized(weights, values, capacity)).toBe(0);
    });
    
    test('용량이 0인 경우', () => {
      const weights = [1, 2, 3];
      const values = [6, 10, 12];
      const capacity = 0;
      
      expect(knapsackOptimized(weights, values, capacity)).toBe(0);
    });
    
    test('단일 물건만 담을 수 있는 경우', () => {
      const weights = [5, 4, 6];
      const values = [10, 40, 30];
      const capacity = 4;
      
      expect(knapsackOptimized(weights, values, capacity)).toBe(40);
    });
  });
  
  describe('두 구현의 결과 일치 테스트', () => {
    const testCases = [
      {
        weights: [2, 3, 4, 5],
        values: [3, 4, 5, 6],
        capacity: 8
      },
      {
        weights: [1, 3, 4, 5],
        values: [1, 4, 5, 7],
        capacity: 7
      },
      {
        weights: [10, 20, 30],
        values: [60, 100, 120],
        capacity: 50
      },
      {
        weights: [5, 10, 15, 20, 25],
        values: [30, 20, 45, 77, 90],
        capacity: 30
      }
    ];
    
    testCases.forEach((testCase, index) => {
      test(`테스트 케이스 ${index + 1}: 두 구현의 결과가 일치해야 함`, () => {
        const { weights, values, capacity } = testCase;
        expect(knapsack(weights, values, capacity)).toBe(knapsackOptimized(weights, values, capacity));
      });
    });
  });
  
  describe('knapsackWithItems 함수 테스트', () => {
    test('기본 테스트 케이스', () => {
      const weights = [2, 3, 4, 5];
      const values = [3, 4, 5, 6];
      const capacity = 8;
      
      const result = knapsackWithItems(weights, values, capacity);
      
      expect(result.maxValue).toBe(10); // 최대 가치
      
      // 선택된 물건들의 무게와 가치의 합 확인
      const selectedWeights = result.selectedItems.map(i => weights[i]);
      const selectedValues = result.selectedItems.map(i => values[i]);
      
      const totalWeight = selectedWeights.reduce((sum, w) => sum + w, 0);
      const totalValue = selectedValues.reduce((sum, v) => sum + v, 0);
      
      expect(totalWeight).toBeLessThanOrEqual(capacity); // 무게 제한 충족
      expect(totalValue).toBe(10); // 최대 가치 달성
    });
    
    test('특정 물건 조합 확인', () => {
      const weights = [1, 2, 3, 5];
      const values = [1, 6, 10, 16];
      const capacity = 7;
      
      const result = knapsackWithItems(weights, values, capacity);
      
      // 이 경우 최적의 선택은 무게 2와 5인 물건 (인덱스 1, 3)
      expect(result.maxValue).toBe(22);
      expect(result.selectedItems).toEqual(expect.arrayContaining([1, 3]));
      
      // 선택된 물건들의 무게 합은 7 이하여야 함
      const totalWeight = result.selectedItems.reduce((sum, i) => sum + weights[i], 0);
      expect(totalWeight).toBeLessThanOrEqual(capacity);
    });
  });
}); 