const { countIslands, countIslandsBFS } = require('../../../src/algorithms/problems/level2/countIslands');

describe('섬의 개수 세기 문제 테스트', () => {
  describe('DFS 구현 테스트', () => {
    test('기본 테스트 케이스 1: 1개의 섬', () => {
      const grid = [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
      ];
      expect(countIslands(grid)).toBe(1);
    });

    test('기본 테스트 케이스 2: 3개의 섬', () => {
      const grid = [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
      ];
      expect(countIslands(grid)).toBe(3);
    });

    test('빈 그리드 테스트', () => {
      expect(countIslands([])).toBe(0);
    });

    test('단일 요소 그리드 테스트 - 섬 없음', () => {
      const grid = [['0']];
      expect(countIslands(grid)).toBe(0);
    });

    test('단일 요소 그리드 테스트 - 섬 하나', () => {
      const grid = [['1']];
      expect(countIslands(grid)).toBe(1);
    });

    test('복잡한 형태의 섬 테스트', () => {
      const grid = [
        ['1', '0', '1', '1', '1'],
        ['1', '0', '1', '0', '1'],
        ['1', '1', '1', '0', '1']
      ];
      expect(countIslands(grid)).toBe(1);
    });

    test('모든 땅인 경우 테스트', () => {
      const grid = [
        ['1', '1', '1'],
        ['1', '1', '1'],
        ['1', '1', '1']
      ];
      expect(countIslands(grid)).toBe(1);
    });

    test('모든 물인 경우 테스트', () => {
      const grid = [
        ['0', '0', '0'],
        ['0', '0', '0'],
        ['0', '0', '0']
      ];
      expect(countIslands(grid)).toBe(0);
    });

    test('대각선으로만 연결된 경우 테스트 (별도의 섬으로 간주)', () => {
      const grid = [
        ['1', '0', '1'],
        ['0', '1', '0'],
        ['1', '0', '1']
      ];
      expect(countIslands(grid)).toBe(5); // 대각선으로만 연결된 경우 별도의 섬으로 간주
    });

    test('null 그리드 테스트', () => {
      expect(countIslands(null)).toBe(0);
    });
  });

  describe('BFS 구현 테스트', () => {
    test('기본 테스트 케이스 1: 1개의 섬', () => {
      const grid = [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
      ];
      expect(countIslandsBFS(grid)).toBe(1);
    });

    test('기본 테스트 케이스 2: 3개의 섬', () => {
      const grid = [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
      ];
      expect(countIslandsBFS(grid)).toBe(3);
    });

    test('DFS와 BFS 결과 비교 - 복잡한 그리드', () => {
      const gridForDFS = [
        ['1', '0', '1', '1', '0', '1', '1'],
        ['1', '0', '1', '1', '0', '1', '1'],
        ['0', '1', '0', '0', '1', '0', '0'],
        ['0', '0', '1', '0', '1', '0', '1']
      ];
      
      const gridForBFS = [
        ['1', '0', '1', '1', '0', '1', '1'],
        ['1', '0', '1', '1', '0', '1', '1'],
        ['0', '1', '0', '0', '1', '0', '0'],
        ['0', '0', '1', '0', '1', '0', '1']
      ];
      
      const dfsResult = countIslands(gridForDFS);
      const bfsResult = countIslandsBFS(gridForBFS);
      
      expect(dfsResult).toBe(bfsResult);
    });
  });
}); 