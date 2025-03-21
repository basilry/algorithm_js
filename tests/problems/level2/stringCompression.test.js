const compressString = require('../../../src/algorithms/problems/level2/stringCompression');

describe('문자열 압축 문제', () => {
  test('예제 1: "aabcccccaaa" -> "a2bc5a3"', () => {
    expect(compressString('aabcccccaaa')).toBe('a2bc5a3');
  });

  test('예제 2: 빈 문자열은 빈 문자열로 압축', () => {
    expect(compressString('')).toBe('');
  });

  test('예제 3: 단일 문자는 그대로 반환', () => {
    expect(compressString('a')).toBe('a');
  });

  test('예제 4: 압축 결과가 원본보다 길면 원본 반환', () => {
    expect(compressString('abc')).toBe('abc');
  });

  test('예제 5: 다양한 문자 압축', () => {
    expect(compressString('aaabbcddddee')).toBe('a3b2cd4e2');
  });

  test('예제 6: 압축 결과가 원본과 동일한 길이인 경우 원본 반환', () => {
    expect(compressString('aabbcc')).toBe('aabbcc');
  });
}); 