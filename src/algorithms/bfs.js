/**
 * 너비 우선 탐색(BFS) 구현
 * @param {Object} graph - 인접 리스트로 표현된 그래프
 * @param {any} start - 시작 노드
 * @returns {Array} 방문 순서대로의 노드 배열
 */
function bfs(graph, start) {
  const visited = new Set()
  const queue = [start]
  const result = []

  visited.add(start)      

  while(queue.length > 0) {
    const current = queue.shift()
    result.push(current)

    for(const neighbor of graph[current] || []) {
      if(!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }

  return result
}

/**
 * 게임 맵 최단거리 문제 해결 함수
 * @param {number[][]} maps - 게임 맵 (0: 벽, 1: 길)
 * @returns {number} 목적지까지의 최단거리, 도달할 수 없으면 -1 반환
 */
function shortestPathInGameMap(maps) {
    // 맵의 크기 계산 (미리 n-1, m-1로 계산하여 비교 연산 최소화)
    const n = maps.length
    const m = maps[0].length
    const endRow = n - 1
    const endCol = m - 1
    
    // 시작점이나 도착점이 벽인 경우 빠른 반환
    if (maps[0][0] === 0 || maps[endRow][endCol] === 0) {
        return -1
    }
    
    // 맵 복사 (원본 보존)
    const mapsCopy = maps.map(row => [...row])
    
    // 방향 배열 최적화 (단일 배열에 모든 방향 저장)
    const dx = [-1, 0, 1, 0]
    const dy = [0, 1, 0, -1]
    
    // BFS 구현을 위한 큐 (객체 리터럴로 좌표와 거리 저장)
    const queue = [{x: 0, y: 0, dist: 1}]
    
    // 시작 위치 방문 표시 (0으로 변경)
    mapsCopy[0][0] = 0
    
    while (queue.length > 0) {
        // 구조 분해 할당으로 현재 위치와 거리 추출
        const {x, y, dist} = queue.shift()
        
        // 도착점에 도달한 경우 즉시 반환
        if (x === endRow && y === endCol) {
            return dist
        }
        
        // 4방향 탐색 (인덱스 기반 루프로 최적화)
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i]
            const ny = y + dy[i]
            
            // 범위 체크와 길 체크를 한 번에 수행
            // 범위 내에 있고 길(1)이면 방문 처리 및 큐에 추가
            if (
                nx >= 0 && nx < n && 
                ny >= 0 && ny < m && 
                mapsCopy[nx][ny] === 1
            ) {
                // 방문 표시 (맵 자체에 0으로 표시)
                mapsCopy[nx][ny] = 0
                
                // 큐에 다음 탐색 위치 추가
                queue.push({x: nx, y: ny, dist: dist + 1})
            }
        }
    }
    
    // 도착점에 도달할 수 없는 경우
    return -1
}

/**
 * 게임 맵 최단거리 문제 해결 함수 (간결한 버전)
 * @param {number[][]} maps - 게임 맵 (0: 벽, 1: 길)
 * @returns {number} 목적지까지의 최단거리, 도달할 수 없으면 -1 반환
 */
function shortestPathSimple(maps) {
    const n = maps.length
    const m = maps[0].length
    const end = [n - 1, m - 1]
    
    // 시작점이나 도착점이 벽인 경우
    if (maps[0][0] === 0 || maps[end[0]][end[1]] === 0) return -1
    
    // 방향 배열(상,우,하,좌)
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    
    // 방문 배열 겸 거리 기록용 (0: 미방문, 다른 값: 거리)
    // 원본 맵을 복사하여 방문 정보와 거리를 저장
    const visited = maps.map(row => [...row])
    
    // 시작점 설정
    const queue = [[0, 0]]
    visited[0][0] = 1 // 시작 거리는 1
    
    while (queue.length > 0) {
        const [x, y] = queue.shift()
        const dist = visited[x][y]
        
        // 도착점에 도달한 경우
        if (x === end[0] && y === end[1]) return dist
        
        // 4방향 탐색
        for (const [dx, dy] of dirs) {
            const nx = x + dx
            const ny = y + dy
            
            // 유효한 좌표 && 길(1)인 경우만 탐색
            if (
                nx >= 0 && nx < n && 
                ny >= 0 && ny < m && 
                visited[nx][ny] === 1 // 길이면서 아직 방문하지 않은 곳
            ) {
                visited[nx][ny] = dist + 1 // 거리 갱신 및 방문 표시
                queue.push([nx, ny])
            }
        }
    }
    
    return -1 // 도달 불가
}

/**
 * 게임 맵 최단거리 문제 해결 함수 (효율성 최적화 버전)
 * @param {number[][]} maps - 게임 맵 (0: 벽, 1: 길)
 * @returns {number} 목적지까지의 최단거리, 도달할 수 없으면 -1 반환
 */
function shortestPathEfficient(maps) {
    // 맵의 크기 계산 (미리 -1 처리하여 비교 연산 최소화)
    const n = maps.length - 1 
    const m = maps[0].length - 1
    
    // 맵 복사 (원본 데이터 보존을 위해)
    const mapsCopy = maps.map(row => [...row])
    
    // 시작점이나 도착점이 벽인 경우
    if (mapsCopy[0][0] === 0 || mapsCopy[n][m] === 0) return -1
    
    // 결과값 초기화
    let answer = -1
    
    // 방향 배열(상,우,하,좌)
    const dx = [-1, 0, 1, 0]
    const dy = [0, 1, 0, -1]
    
    // BFS 구현
    const queue = []
    queue.push([0, 0, 1]) // [x좌표, y좌표, 거리]
    mapsCopy[0][0] = 0 // 방문 표시 (0으로 변경)
    
    while (queue.length > 0) {
        const [x, y, cnt] = queue.shift()
        
        // 도착점에 도달한 경우
        if (x === n && y === m) {
            answer = cnt
            break // 즉시 루프 종료
        }
        
        // 4방향 탐색
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i]
            const ny = y + dy[i]
            
            // 맵 범위 내에 있고, 길인 경우
            if (
                nx >= 0 && nx <= n && 
                ny >= 0 && ny <= m && 
                mapsCopy[nx][ny] === 1
            ) {
                mapsCopy[nx][ny] = 0 // 방문 표시 (맵 직접 수정)
                queue.push([nx, ny, cnt + 1])
            }
        }
    }
    
    return answer
}

/**
 * 타겟 넘버 문제 해결 함수 (BFS 활용)
 * 각 숫자마다 더하거나 빼서 타겟 넘버를 만드는 방법의 수를 반환
 * @param {number[]} numbers - 사용할 수 있는 숫자들의 배열
 * @param {number} target - 만들어야 하는 타겟 넘버
 * @returns {number} - 타겟 넘버를 만드는 방법의 수
 */
function findTargetNumber(numbers, target) {
    // 초기 상태: 첫 번째 레벨(인덱스)과 현재까지의 합(0)
    const queue = [{ level: 0, sum: 0 }]
    let count = 0
    
    while (queue.length > 0) {
        // 현재 상태 추출
        const { level, sum } = queue.shift()
        
        // 모든 숫자를 사용한 경우 (마지막 레벨에 도달)
        if (level === numbers.length) {
            // 현재 합이 타겟과 일치하면 카운트 증가
            if (sum === target) {
                count++
            }
            continue //다음 경우의 수 확인
        }
        
        // 현재 숫자를 더하는 경우
        queue.push({ 
            level: level + 1, 
            sum: sum + numbers[level] 
        })
        
        // 현재 숫자를 빼는 경우
        queue.push({ 
            level: level + 1, 
            sum: sum - numbers[level] 
        })
    }
    
    return count
}

/**
 * 네트워크의 개수를 계산하는 함수 (BFS 활용)
 * @param {number} n - 컴퓨터의 개수
 * @param {number[][]} computers - 연결 정보가 담긴 2차원 배열
 * @returns {number} - 네트워크의 개수
 */
function countNetworksBFS(n, computers) {
    // 방문 여부를 추적하는 배열
    const visited = new Array(n).fill(false);
    // 네트워크 개수
    let networkCount = 0;
    
    // 각 컴퓨터에 대해 BFS 실행
    for (let i = 0; i < n; i++) {
        // 아직 방문하지 않은 컴퓨터라면
        if (!visited[i]) {
            // 새로운 네트워크 발견
            networkCount++;
            
            // BFS로 연결된 모든 컴퓨터 방문
            const queue = [i];
            visited[i] = true;
            
            while (queue.length > 0) {
                const current = queue.shift();
                
                // 현재 컴퓨터와 연결된 모든 컴퓨터 탐색
                for (let j = 0; j < n; j++) {
                    if (computers[current][j] === 1 && !visited[j]) {
                        visited[j] = true;
                        queue.push(j);
                    }
                }
            }
        }
    }
    
    return networkCount;
}

module.exports = { 
    bfs,
    shortestPathInGameMap,
    shortestPathSimple,
    shortestPathEfficient,
    findTargetNumber,
    countNetworksBFS,
}
