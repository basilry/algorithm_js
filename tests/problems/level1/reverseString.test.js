const reverseString = require('../../../src/problems/level1/reverseString');

describe('문자열 뒤집기 문제', () => {
  test('예제 1: "hello" -> "olleh"', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('예제 2: 빈 문자열은 빈 문자열로 뒤집힘', () => {
    expect(reverseString('')).toBe('');
  });

  test('예제 3: 한 글자 문자열은 그대로 유지', () => {
    expect(reverseString('a')).toBe('a');
  });

  test('예제 4: 긴 문자열 뒤집기', () => {
    expect(reverseString('abcdefghijklmnopqrstuvwxyz')).toBe('zyxwvutsrqponmlkjihgfedcba');
  });

  test('예제 5: 한글 문자열 뒤집기', () => {
    expect(reverseString('안녕하세요')).toBe('요세하녕안');
  });
}); 