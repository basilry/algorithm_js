/**
 * 너비 우선 탐색(BFS) 구현
 * @param {Object} graph - 인접 리스트로 표현된 그래프
 * @param {any} start - 시작 노드
 * @returns {Array} 방문 순서대로의 노드 배열
 */
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);
    
    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

module.exports = bfs; 