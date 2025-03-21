const { findAllSubsets, findAllSubsetsRecursive } = require('../../../src/algorithms/problems/level1/subsets');

describe('모든 부분집합 찾기 문제 (반복적 방법)', () => {
  test('예제 1: [1, 2, 3]의 모든 부분집합', () => {
    const nums = [1, 2, 3];
    const result = findAllSubsets(nums);
    
    // 총 2^3 = 8개의 부분집합이 있어야 함
    expect(result.length).toBe(8);
    
    // 모든 가능한 부분집합이 포함되어 있는지 확인
    const expected = [
      [], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]
    ];
    
    // 모든 예상 부분집합이 결과에 포함되어 있는지 확인
    expected.forEach(subset => {
      expect(result).toContainEqual(subset);
    });
  });

  test('예제 2: 빈 배열의 부분집합은 빈 집합', () => {
    expect(findAllSubsets([])).toEqual([[]]);
  });

  test('예제 3: [1]의 부분집합', () => {
    const result = findAllSubsets([1]);
    expect(result.length).toBe(2);
    expect(result).toContainEqual([]);
    expect(result).toContainEqual([1]);
  });

  test('예제 4: [1, 2]의 부분집합', () => {
    const result = findAllSubsets([1, 2]);
    expect(result.length).toBe(4);
    expect(result).toContainEqual([]);
    expect(result).toContainEqual([1]);
    expect(result).toContainEqual([2]);
    expect(result).toContainEqual([1, 2]);
  });

  test('예제 5: 중복된 요소가 있는 경우', () => {
    const result = findAllSubsets([1, 1]);
    // 중복을 고려하지 않는 구현이므로 4개의 부분집합이 생성됨
    // (실제로는 중복을 고려하면 3개의 고유한 부분집합이 나와야 함)
    expect(result.length).toBe(4);
  });
});

describe('모든 부분집합 찾기 문제 (재귀적 방법)', () => {
  test('예제 1: [1, 2, 3]의 모든 부분집합', () => {
    const nums = [1, 2, 3];
    const result = findAllSubsetsRecursive(nums);
    
    // 총 2^3 = 8개의 부분집합이 있어야 함
    expect(result.length).toBe(8);
    
    // 모든 가능한 부분집합이 포함되어 있는지 확인
    const expected = [
      [], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]
    ];
    
    // 모든 예상 부분집합이 결과에 포함되어 있는지 확인
    expected.forEach(subset => {
      expect(result).toContainEqual(subset);
    });
  });

  test('예제 2: 빈 배열의 부분집합은 빈 집합', () => {
    const result = findAllSubsetsRecursive([]);
    expect(result).toEqual([[]]);
  });
}); 