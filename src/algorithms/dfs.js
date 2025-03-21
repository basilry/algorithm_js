/**
 * 깊이 우선 탐색(DFS) 구현
 * @param {Object} graph - 인접 리스트로 표현된 그래프
 * @param {any} start - 시작 노드
 * @returns {Array} 방문 순서대로의 노드 배열
 */
function dfs(graph, start) {
  const visited = new Set();
  const result = [];
  
  function dfsHelper(node) {
    visited.add(node);
    result.push(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }
  
  dfsHelper(start);
  return result;
}

module.exports = dfs; 