const { isMatch, isMatchRecursive } = require('../../../src/problems/level3/regexMatch');

describe('정규 표현식 매칭 문제 테스트', () => {
  describe('동적 프로그래밍 기반 isMatch 함수 테스트', () => {
    test('기본 테스트 - 문자열과 패턴이 일치하는 경우', () => {
      expect(isMatch('aa', 'aa')).toBe(true);
    });
    
    test('점(.) 문자 테스트', () => {
      expect(isMatch('ab', 'a.')).toBe(true);
      expect(isMatch('ac', 'a.')).toBe(true);
    });
    
    test('별표(*) 문자 테스트', () => {
      expect(isMatch('aa', 'a*')).toBe(true);
      expect(isMatch('aaa', 'a*')).toBe(true);
      expect(isMatch('', 'a*')).toBe(true);
    });
    
    test('복합 패턴 테스트', () => {
      expect(isMatch('aab', 'c*a*b')).toBe(true);
      expect(isMatch('mississippi', 'mis*is*p*.')).toBe(false);
      expect(isMatch('mississippi', 'mis*is*ip*i')).toBe(true);
    });
    
    test('빈 문자열과 패턴 테스트', () => {
      expect(isMatch('', '')).toBe(true);
      expect(isMatch('a', '')).toBe(false);
      expect(isMatch('', 'a')).toBe(false);
      expect(isMatch('', 'a*')).toBe(true);
      expect(isMatch('', 'a*b*')).toBe(true);
    });
    
    test('복잡한 패턴 테스트', () => {
      expect(isMatch('ab', '.*')).toBe(true);
      expect(isMatch('aab', 'c*a*b')).toBe(true);
      expect(isMatch('abbabaaaaaaacaa', 'a*.*b.a.*c*b*a*c*')).toBe(false);
    });
  });
  
  describe('재귀 기반 isMatchRecursive 함수 테스트', () => {
    test('기본 테스트 - 문자열과 패턴이 일치하는 경우', () => {
      expect(isMatchRecursive('aa', 'aa')).toBe(true);
    });
    
    test('점(.) 문자 테스트', () => {
      expect(isMatchRecursive('ab', 'a.')).toBe(true);
      expect(isMatchRecursive('ac', 'a.')).toBe(true);
    });
    
    test('별표(*) 문자 테스트', () => {
      expect(isMatchRecursive('aa', 'a*')).toBe(true);
      expect(isMatchRecursive('aaa', 'a*')).toBe(true);
      expect(isMatchRecursive('', 'a*')).toBe(true);
    });
    
    test('복합 패턴 테스트', () => {
      expect(isMatchRecursive('aab', 'c*a*b')).toBe(true);
      expect(isMatchRecursive('mississippi', 'mis*is*p*.')).toBe(false);
      expect(isMatchRecursive('mississippi', 'mis*is*ip*i')).toBe(true);
    });
    
    test('빈 문자열과 패턴 테스트', () => {
      expect(isMatchRecursive('', '')).toBe(true);
      expect(isMatchRecursive('a', '')).toBe(false);
      expect(isMatchRecursive('', 'a')).toBe(false);
      expect(isMatchRecursive('', 'a*')).toBe(true);
      expect(isMatchRecursive('', 'a*b*')).toBe(true);
    });
    
    test('복잡한 패턴 테스트', () => {
      expect(isMatchRecursive('ab', '.*')).toBe(true);
      expect(isMatchRecursive('aab', 'c*a*b')).toBe(true);
      expect(isMatchRecursive('abbabaaaaaaacaa', 'a*.*b.a.*c*b*a*c*')).toBe(false);
    });
  });
  
  describe('두 구현의 결과 일치 테스트', () => {
    const testCases = [
      { s: 'aa', p: 'a' },
      { s: 'aa', p: 'a*' },
      { s: 'ab', p: '.*' },
      { s: 'aab', p: 'c*a*b' },
      { s: 'mississippi', p: 'mis*is*p*.' },
      { s: 'mississippi', p: 'mis*is*ip*i' },
      { s: '', p: 'a*' },
      { s: '', p: 'a*b*' },
      { s: 'abbabaaaaaaacaa', p: 'a*.*b.a.*c*b*a*c*' }
    ];
    
    testCases.forEach(({ s, p }, index) => {
      test(`테스트 케이스 ${index + 1}: 두 구현의 결과가 일치해야 함`, () => {
        expect(isMatch(s, p)).toBe(isMatchRecursive(s, p));
      });
    });
  });
}); 