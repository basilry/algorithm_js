const countNetworkComponents = require('../../../src/problems/level2/networkComponents');

describe('네트워크 연결 요소 문제', () => {
  test('예제 1: 3대의 컴퓨터, 연결 [[0,1], [1,2]] -> 1개의 연결 요소', () => {
    const n = 3;
    const connections = [[0, 1], [1, 2]];
    expect(countNetworkComponents(n, connections)).toBe(1);
  });

  test('예제 2: 연결이 없는 경우', () => {
    const n = 3;
    const connections = [];
    expect(countNetworkComponents(n, connections)).toBe(3);
  });

  test('예제 3: 부분적으로 연결된 경우', () => {
    const n = 5;
    const connections = [[0, 1], [2, 3]];
    expect(countNetworkComponents(n, connections)).toBe(3);
  });

  test('예제 4: 모든 컴퓨터가 연결된 경우', () => {
    const n = 4;
    const connections = [[0, 1], [1, 2], [2, 3], [3, 0]];
    expect(countNetworkComponents(n, connections)).toBe(1);
  });

  test('예제 5: 복잡한 연결 구조', () => {
    const n = 6;
    const connections = [[0, 1], [1, 2], [3, 4]];
    expect(countNetworkComponents(n, connections)).toBe(3);
  });
}); 