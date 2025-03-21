const shortestPath = require('../../../src/algorithms/problems/level1/shortestPath');

describe('최단 경로 찾기 문제', () => {
  test('예제 1: 기본 미로', () => {
    const maze = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0]
    ];
    expect(shortestPath(maze)).toBe(4);
  });

  test('예제 2: 경로가 없는 경우', () => {
    const maze = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
    expect(shortestPath(maze)).toBe(-1);
  });

  test('예제 3: 더 복잡한 미로', () => {
    const maze = [
      [0, 0, 0, 0, 0],
      [1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ];
    expect(shortestPath(maze)).toBe(8);
  });

  test('예제 4: 시작점이 벽인 경우', () => {
    const maze = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    expect(shortestPath(maze)).toBe(-1);
  });

  test('예제 5: 도착점이 벽인 경우', () => {
    const maze = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 1]
    ];
    expect(shortestPath(maze)).toBe(-1);
  });
}); 