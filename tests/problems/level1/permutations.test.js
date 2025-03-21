const findAllPermutations = require('../../../src/algorithms/problems/level1/permutations');

describe('모든 순열 찾기 문제', () => {
  test('예제 1: [1, 2, 3]의 모든 순열', () => {
    const nums = [1, 2, 3];
    const result = findAllPermutations(nums);
    
    // 총 3! = 6개의 순열이 있어야 함
    expect(result.length).toBe(6);
    
    // 모든 가능한 순열이 포함되어 있는지 확인
    const expected = [
      [1, 2, 3], [1, 3, 2],
      [2, 1, 3], [2, 3, 1],
      [3, 1, 2], [3, 2, 1]
    ];
    
    // 모든 예상 순열이 결과에 포함되어 있는지 확인
    expected.forEach(perm => {
      expect(result).toContainEqual(perm);
    });
  });

  test('예제 2: 빈 배열의 순열은 빈 배열', () => {
    expect(findAllPermutations([])).toEqual([[]]);
  });

  test('예제 3: 원소가 1개인 배열의 순열은 자기 자신', () => {
    expect(findAllPermutations([5])).toEqual([[5]]);
  });

  test('예제 4: [1, 2]의 순열', () => {
    const result = findAllPermutations([1, 2]);
    expect(result.length).toBe(2);
    expect(result).toContainEqual([1, 2]);
    expect(result).toContainEqual([2, 1]);
  });

  test('예제 5: 중복이 있는 배열의 순열', () => {
    const result = findAllPermutations([1, 1, 2]);
    
    // 중복을 고려하지 않으므로 3! = 6개의 순열이 생성되지만,
    // 실제로는 일부가 중복되어 3개의 고유한 순열만 존재
    // 현재 구현은 중복을 고려하지 않으므로 6개가 나옴
    expect(result.length).toBe(6);
  });
}); 