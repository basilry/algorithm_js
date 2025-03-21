/**
 * 2차원 그리드에서 섬의 개수를 세는 함수
 * 그리드에서 '1'은 땅을 나타내고 '0'은 물을 나타냅니다.
 * 섬은 땅('1')이 수평 또는 수직으로 연결되어 있는 부분입니다.
 *
 * @param {character[][]} grid - 2차원 그리드 (문자 배열)
 * @return {number} - 섬의 개수
 */
function countIslands(grid) {
    // 예외 처리: 빈 그리드인 경우
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0
    }

    const rows = grid.length
    const cols = grid[0].length
    let count = 0

    // DFS 함수: 현재 위치에서 연결된 모든 땅을 방문
    function dfs(r, c) {
        // 범위를 벗어나거나 물('0')이거나 이미 방문한 땅('-1')인 경우 종료
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== "1") {
            return
        }

        // 현재 위치를 방문했다고 표시 (방문한 땅은 '-1'로 변경)
        grid[r][c] = "-1"

        // 상하좌우 네 방향으로 DFS 탐색
        dfs(r - 1, c) // 위
        dfs(r + 1, c) // 아래
        dfs(r, c - 1) // 왼쪽
        dfs(r, c + 1) // 오른쪽
    }

    // 그리드의 모든 위치를 순회
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 땅('1')을 발견하면 DFS로 연결된 모든 땅을 탐색하고 카운트 증가
            if (grid[r][c] === "1") {
                count++
                dfs(r, c)
            }
        }
    }

    // 원본 그리드 복원 (선택 사항: 문제에 따라 필요할 수 있음)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "-1") {
                grid[r][c] = "1"
            }
        }
    }

    return count
}

/**
 * BFS를 사용하여 섬의 개수를 세는 대체 구현
 *
 * @param {character[][]} grid - 2차원 그리드 (문자 배열)
 * @return {number} - 섬의 개수
 */
function countIslandsBFS(grid) {
    // 예외 처리: 빈 그리드인 경우
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0
    }

    const rows = grid.length
    const cols = grid[0].length
    let count = 0

    // 네 방향 이동을 위한 배열 (상, 하, 좌, 우)
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ]

    // BFS 함수: 현재 위치에서 연결된 모든 땅을 방문
    function bfs(r, c) {
        const queue = [[r, c]]
        grid[r][c] = "-1" // 방문 표시

        while (queue.length > 0) {
            const [currentR, currentC] = queue.shift()

            // 네 방향 탐색
            for (const [dr, dc] of directions) {
                const newR = currentR + dr
                const newC = currentC + dc

                // 범위 내이며 방문하지 않은 땅인 경우
                if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && grid[newR][newC] === "1") {
                    queue.push([newR, newC])
                    grid[newR][newC] = "-1" // 방문 표시
                }
            }
        }
    }

    // 그리드의 모든 위치를 순회
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 땅('1')을 발견하면 BFS로 연결된 모든 땅을 탐색하고 카운트 증가
            if (grid[r][c] === "1") {
                count++
                bfs(r, c)
            }
        }
    }

    // 원본 그리드 복원 (선택 사항)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "-1") {
                grid[r][c] = "1"
            }
        }
    }

    return count
}

module.exports = {
    countIslands,
    countIslandsBFS,
}
