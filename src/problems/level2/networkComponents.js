/**
 * 네트워크 연결 요소 (그래프 탐색 - 레벨 2)
 * 컴퓨터 네트워크에서 연결된 그룹(컴포넌트)의 수 찾기
 * 
 * @param {number} n - 컴퓨터 개수
 * @param {number[][]} connections - 연결 정보 배열 (예: [[0,1], [1,2]])
 * @returns {number} - 연결 요소(컴포넌트)의 수
 */
function countNetworkComponents(n, connections) {
  // 인접 리스트로 그래프 구성
  const graph = Array.from({ length: n }, () => []);
  
  for (const [a, b] of connections) {
    graph[a].push(b);
    graph[b].push(a); // 양방향 그래프
  }
  
  // 방문 여부 배열
  const visited = new Array(n).fill(false);
  
  // DFS로 연결된 컴포넌트 탐색
  function dfs(node) {
    visited[node] = true;
    
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }
  
  // 연결 요소 개수 계산
  let componentCount = 0;
  
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      componentCount++;
      dfs(i);
    }
  }
  
  return componentCount;
}

module.exports = countNetworkComponents; 