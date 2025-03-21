const isValidParentheses = require('../../../src/algorithms/problems/level1/validParentheses');

describe('유효한 괄호 문제', () => {
  test('예제 1: "()" -> true', () => {
    expect(isValidParentheses('()')).toBe(true);
  });

  test('예제 2: "()[]{}" -> true', () => {
    expect(isValidParentheses('()[]{}')).toBe(true);
  });

  test('예제 3: "(]" -> false', () => {
    expect(isValidParentheses('(]')).toBe(false);
  });

  test('예제 4: "([)]" -> false', () => {
    expect(isValidParentheses('([)]')).toBe(false);
  });

  test('예제 5: "{[]}" -> true', () => {
    expect(isValidParentheses('{[]}')).toBe(true);
  });

  test('예제 6: "{{((()))}}" -> true', () => {
    expect(isValidParentheses('{{((()))}}')).toBe(true);
  });

  test('예제 7: 빈 문자열은 유효함', () => {
    expect(isValidParentheses('')).toBe(true);
  });

  test('예제 8: 홀수 길이 문자열은 항상 유효하지 않음', () => {
    expect(isValidParentheses('(')).toBe(false);
    expect(isValidParentheses('()(')).toBe(false);
  });
}); 