const bfs = require('../../src/algorithms/bfs');

describe('너비 우선 탐색(BFS) 테스트', () => {
  test('단순 그래프에서 BFS 순회 테스트', () => {
    // 간단한 그래프 생성
    const graph = {
      'A': ['B', 'C'],
      'B': ['A', 'D', 'E'],
      'C': ['A', 'F'],
      'D': ['B'],
      'E': ['B', 'F'],
      'F': ['C', 'E']
    };
    
    // A에서 시작하는 BFS 순회
    const result = bfs(graph, 'A');
    
    // BFS 결과: A -> (A의 모든 인접 노드) -> (B의 인접 노드들) -> (C의 인접 노드들) ...
    expect(result).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });
  
  test('연결되지 않은 노드가 있는 그래프 테스트', () => {
    const graph = {
      '1': ['2', '3'],
      '2': ['1', '4'],
      '3': ['1'],
      '4': ['2'],
      '5': ['6'],
      '6': ['5']
    };
    
    // 1에서 시작하는 BFS 순회 - 5, 6에 도달할 수 없음
    const result = bfs(graph, '1');
    expect(result).toEqual(['1', '2', '3', '4']);
    
    // 5에서 시작하는 BFS - 1, 2, 3, 4에 도달할 수 없음
    const result2 = bfs(graph, '5');
    expect(result2).toEqual(['5', '6']);
  });
  
  test('싸이클이 있는 그래프 테스트', () => {
    const graph = {
      'X': ['Y', 'Z'],
      'Y': ['X', 'Z'],
      'Z': ['X', 'Y']
    };
    
    const result = bfs(graph, 'X');
    expect(result).toEqual(['X', 'Y', 'Z']);
  });
  
  test('노드가 하나인 그래프 테스트', () => {
    const graph = {
      'A': []
    };
    
    const result = bfs(graph, 'A');
    expect(result).toEqual(['A']);
  });
  
  test('존재하지 않는 노드로 시작하는 경우', () => {
    const graph = {
      'A': ['B'],
      'B': ['A']
    };
    
    const result = bfs(graph, 'C');
    expect(result).toEqual(['C']);
  });
  
  test('가중치 그래프에서 최단 경로 찾기 시뮬레이션', () => {
    // 이 테스트는 BFS의 가중치 그래프 최단 경로 응용 시나리오를 보여줍니다
    // BFS는 각 간선의 가중치가 동일할 때 최단 경로를 찾을 수 있습니다
    
    const graph = {
      'S': ['A', 'B'],      // 출발점 S에서 A와 B로 갈 수 있음
      'A': ['S', 'C', 'D'], // A에서 S, C, D로 갈 수 있음
      'B': ['S', 'D', 'E'], // ...
      'C': ['A', 'F'],
      'D': ['A', 'B', 'F', 'G'],
      'E': ['B', 'G'],
      'F': ['C', 'D', 'Goal'],
      'G': ['D', 'E', 'Goal'],
      'Goal': ['F', 'G']
    };
    
    // S에서 시작하는 BFS는 S로부터의 거리가 증가하는 순서대로 노드를 방문합니다
    const visitOrder = bfs(graph, 'S');
    
    // S의 인접 노드들(거리 1), 그 다음은 거리 2의 노드들, ...
    expect(visitOrder.indexOf('S')).toBe(0); // S는 항상 첫 번째
    
    // S의 직접 이웃들은 A와 B (거리 1)
    expect(visitOrder.indexOf('A')).toBeLessThan(visitOrder.indexOf('C'));
    expect(visitOrder.indexOf('A')).toBeLessThan(visitOrder.indexOf('D'));
    expect(visitOrder.indexOf('B')).toBeLessThan(visitOrder.indexOf('E'));
    
    // Goal은 거리 3에 있으므로 마지막 노드들 중 하나여야 함
    expect(visitOrder.indexOf('Goal')).toBeGreaterThan(visitOrder.indexOf('F'));
    expect(visitOrder.indexOf('Goal')).toBeGreaterThan(visitOrder.indexOf('G'));
  });
}); 