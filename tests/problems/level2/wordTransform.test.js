const wordTransform = require('../../../src/algorithms/problems/level2/wordTransform');

describe('단어 변환 문제', () => {
  test('예제 1: "hit" -> "cog" (hit -> hot -> dot -> dog -> cog)', () => {
    const beginWord = 'hit';
    const endWord = 'cog';
    const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
    expect(wordTransform(beginWord, endWord, wordList)).toBe(5);
  });

  test('예제 2: 변환 불가능한 경우', () => {
    const beginWord = 'hit';
    const endWord = 'cog';
    const wordList = ['hot', 'dot', 'dog', 'lot', 'log']; // cog가 목록에 없음
    expect(wordTransform(beginWord, endWord, wordList)).toBe(0);
  });

  test('예제 3: 더 짧은 경로가 있는 경우', () => {
    const beginWord = 'dog';
    const endWord = 'bog';
    const wordList = ['bog', 'cog', 'fog'];
    expect(wordTransform(beginWord, endWord, wordList)).toBe(2);
  });

  test('예제 4: 시작 단어와 목표 단어가 같은 경우', () => {
    const beginWord = 'dog';
    const endWord = 'dog';
    const wordList = ['bog', 'cog', 'fog', 'dog'];
    expect(wordTransform(beginWord, endWord, wordList)).toBe(1);
  });

  test('예제 5: 더 긴 단어의 변환', () => {
    const beginWord = 'talk';
    const endWord = 'code';
    const wordList = ['tall', 'tale', 'call', 'care', 'core', 'code'];
    expect(wordTransform(beginWord, endWord, wordList)).toBe(0); // 불가능한 변환
  });
}); 