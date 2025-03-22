/**
 * 깊이 우선 탐색(DFS) 구현
 * @param {Object} graph - 인접 리스트로 표현된 그래프
 * @param {any} start - 시작 노드
 * @returns {Array} 방문 순서대로의 노드 배열
 */
function dfs(graph, start) {
    const visited = new Set()
    const result = []

    function dfsHelper(node) {
        visited.add(node)
        result.push(node)

        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                dfsHelper(neighbor)
            }
        }
    }

    dfsHelper(start)
    return result
}

/**
 * 타겟 넘버 문제 해결 함수 (DFS 활용)
 * 각 숫자마다 더하거나 빼서 타겟 넘버를 만드는 방법의 수를 반환
 * @param {number[]} numbers - 사용할 수 있는 숫자들의 배열
 * @param {number} target - 만들어야 하는 타겟 넘버
 * @returns {number} - 타겟 넘버를 만드는 방법의 수
 */
function findTargetNumber(numbers, target) {
    let count = 0;
    
    function dfsHelper(index, sum) {
        // 모든 숫자를 사용한 경우
        if (index === numbers.length) {
            // 현재 합이 타겟과 일치하면 카운트 증가
            if (sum === target) {
                count++;
            }
            return;
        }
        
        // 현재 숫자를 더하는 경우
        dfsHelper(index + 1, sum + numbers[index]);
        
        // 현재 숫자를 빼는 경우
        dfsHelper(index + 1, sum - numbers[index]);
    }
    
    // 초기 호출: 첫 번째 인덱스(0)와 현재까지의 합(0)
    dfsHelper(0, 0);
    
    return count;
}

/**
 * 타겟 넘버 문제 해결 함수 (최적화 버전)
 * 동적 프로그래밍 접근법을 사용하여 계산 결과를 메모이제이션
 * @param {number[]} numbers - 사용할 수 있는 숫자들의 배열
 * @param {number} target - 만들어야 하는 타겟 넘버
 * @returns {number} - 타겟 넘버를 만드는 방법의 수
 */
function findTargetNumberOptimized(numbers, target) {
    // 메모이제이션을 위한 맵
    const memo = new Map();
    
    function dfsWithMemo(index, sum) {
        // 종료 조건: 모든 숫자를 사용한 경우
        if (index === numbers.length) {
            return sum === target ? 1 : 0;
        }
        
        // 메모이제이션 키 생성
        const key = `${index},${sum}`;
        
        // 이미 계산된 결과가 있으면 반환
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        // 현재 숫자를 더하는 경우 + 현재 숫자를 빼는 경우
        const result = dfsWithMemo(index + 1, sum + numbers[index]) + 
                      dfsWithMemo(index + 1, sum - numbers[index]);
        
        // 결과 메모이제이션
        memo.set(key, result);
        
        return result;
    }
    
    return dfsWithMemo(0, 0);
}

/**
 * 네트워크의 개수를 계산하는 함수
 * @param {number} n - 컴퓨터의 개수
 * @param {number[][]} computers - 연결 정보가 담긴 2차원 배열
 * @returns {number} - 네트워크의 개수
 */
function countNetworks(n, computers) {
    // 방문 여부를 추적하는 배열
    const visited = new Array(n).fill(false);
    // 네트워크 개수
    let networkCount = 0;
    
    // 각 컴퓨터에 대해 DFS 실행
    for (let i = 0; i < n; i++) {
        // 아직 방문하지 않은 컴퓨터라면
        if (!visited[i]) {
            // 새로운 네트워크 발견
            networkCount++;
            // DFS로 연결된 모든 컴퓨터 방문
            dfsNetwork(i, computers, visited);
        }
    }
    
    return networkCount;
}

/**
 * 네트워크 탐색을 위한 DFS 헬퍼 함수
 * @param {number} computer - 현재 컴퓨터 번호
 * @param {number[][]} computers - 연결 정보
 * @param {boolean[]} visited - 방문 정보
 */
function dfsNetwork(computer, computers, visited) {
    // 현재 컴퓨터 방문 처리
    visited[computer] = true;
    
    // 현재 컴퓨터와 연결된 모든 컴퓨터 탐색
    for (let i = 0; i < computers.length; i++) {
        // 자기 자신이 아니고, 연결되어 있고, 아직 방문하지 않은 컴퓨터라면
        if (i !== computer && computers[computer][i] === 1 && !visited[i]) {
            // 재귀적으로 DFS 호출
            dfsNetwork(i, computers, visited);
        }
    }
}

module.exports = {
    dfs,
    findTargetNumber,
    findTargetNumberOptimized,
    countNetworks
}
