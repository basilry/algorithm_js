const findCombinationSum = require('../../../src/algorithms/problems/level2/combinations');

describe('숫자 조합 문제', () => {
  test('예제 1: 목표합 7의 모든 조합', () => {
    const result = findCombinationSum(7);
    
    // 기대되는 조합들
    const expected = [
      [1, 2, 4],
      [1, 6],
      [2, 5],
      [3, 4],
      [7]
    ];
    
    // 결과 길이 확인
    expect(result.length).toBe(expected.length);
    
    // 모든 예상 조합이 결과에 포함되어 있는지 확인
    expected.forEach(combination => {
      expect(result).toContainEqual(combination);
    });
  });

  test('예제 2: 목표합 9의 조합', () => {
    const result = findCombinationSum(9);
    
    // 일부 기대되는 조합들 (전체 조합은 더 많음)
    expect(result).toContainEqual([1, 2, 6]);
    expect(result).toContainEqual([1, 3, 5]);
    expect(result).toContainEqual([2, 3, 4]);
    expect(result).toContainEqual([4, 5]);
    expect(result).toContainEqual([9]);
  });

  test('예제 3: 크기가 3인 목표합 9의 조합', () => {
    const result = findCombinationSum(9, 3);
    
    const expected = [
      [1, 2, 6],
      [1, 3, 5],
      [2, 3, 4]
    ];
    
    expect(result.length).toBe(expected.length);
    
    expected.forEach(combination => {
      expect(result).toContainEqual(combination);
    });
  });

  test('예제 4: 목표합이 너무 작은 경우', () => {
    expect(findCombinationSum(0)).toEqual([]);
  });

  test('예제 5: 목표합이 너무 큰 경우', () => {
    expect(findCombinationSum(100)).toEqual([]);
  });
}); 