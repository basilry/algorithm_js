const { isAnagram, isAnagramSorting } = require('../../../src/problems/level1/isAnagram');

describe('두 문자열의 아나그램 확인 문제 테스트', () => {
  describe('해시맵 기반 isAnagram 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      expect(isAnagram('anagram', 'nagaram')).toBe(true);
    });
    
    test('예제 2: 아나그램이 아닌 경우', () => {
      expect(isAnagram('rat', 'car')).toBe(false);
    });
    
    test('예제 3: 길이가 다른 경우', () => {
      expect(isAnagram('abc', 'abcd')).toBe(false);
    });
    
    test('예제 4: 빈 문자열', () => {
      expect(isAnagram('', '')).toBe(true);
    });
    
    test('예제 5: 대소문자 구분', () => {
      expect(isAnagram('Abc', 'abc')).toBe(false);
    });
    
    test('예제 6: 공백 포함', () => {
      expect(isAnagram('a b c', 'bca ')).toBe(true);
    });
    
    test('예제 7: 특수 문자 포함', () => {
      expect(isAnagram('a!b@c#', 'c@b!a#')).toBe(true);
    });
  });
  
  describe('정렬 기반 isAnagramSorting 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      expect(isAnagramSorting('anagram', 'nagaram')).toBe(true);
    });
    
    test('예제 2: 아나그램이 아닌 경우', () => {
      expect(isAnagramSorting('rat', 'car')).toBe(false);
    });
    
    test('예제 3: 길이가 다른 경우', () => {
      expect(isAnagramSorting('abc', 'abcd')).toBe(false);
    });
    
    test('예제 4: 빈 문자열', () => {
      expect(isAnagramSorting('', '')).toBe(true);
    });
    
    test('예제 5: 대소문자 구분', () => {
      expect(isAnagramSorting('Abc', 'abc')).toBe(false);
    });
    
    test('예제 6: 공백 포함', () => {
      expect(isAnagramSorting('a b c', 'bca ')).toBe(true);
    });
    
    test('예제 7: 특수 문자 포함', () => {
      expect(isAnagramSorting('a!b@c#', 'c@b!a#')).toBe(true);
    });
  });
  
  describe('두 구현의 결과 일치 테스트', () => {
    const testCases = [
      ['anagram', 'nagaram'],
      ['rat', 'car'],
      ['abc', 'abcd'],
      ['', ''],
      ['Abc', 'abc'],
      ['a b c', 'bca '],
      ['a!b@c#', 'c@b!a#'],
      ['HelloWorld', 'WorldHello'],
      ['aaabbb', 'ababab']
    ];
    
    testCases.forEach(([s, t], index) => {
      test(`테스트 케이스 ${index + 1}: 두 구현의 결과가 일치해야 함`, () => {
        expect(isAnagram(s, t)).toBe(isAnagramSorting(s, t));
      });
    });
  });
}); 