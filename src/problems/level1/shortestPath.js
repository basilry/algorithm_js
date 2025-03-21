/**
 * 미로에서 최단 경로 찾기 (그래프 탐색 - 레벨 1)
 * 0은 이동 가능한 경로, 1은 벽을 나타내는 2차원 배열에서
 * 시작점(0,0)에서 도착점(rows-1, cols-1)까지의 최단 경로 길이를 구하는 함수
 *
 * @param {number[][]} maze - 미로 배열 (0: 이동 가능, 1: 벽)
 * @returns {number} - 최단 경로 길이, 경로가 없으면 -1 반환
 */
function shortestPath(maze) {
    if (!maze || maze.length === 0 || maze[0].length === 0) return -1
    if (maze[0][0] === 1 || maze[maze.length - 1][maze[0].length - 1] === 1) return -1

    const rows = maze.length
    const cols = maze[0].length

    // 방향 배열 (상, 우, 하, 좌)
    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]

    // BFS 사용
    const queue = [[0, 0, 0]] // [row, col, distance] - 시작점에서 거리는 0으로 시작

    // 방문 배열
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
    visited[0][0] = true

    while (queue.length > 0) {
        const [row, col, distance] = queue.shift()

        // 도착점에 도달한 경우
        if (row === rows - 1 && col === cols - 1) {
            return distance
        }

        // 4방향 탐색
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow
            const newCol = col + dCol

            // 유효한 좌표인지, 방문하지 않았는지, 벽이 아닌지 확인
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !visited[newRow][newCol] &&
                maze[newRow][newCol] === 0
            ) {
                visited[newRow][newCol] = true
                queue.push([newRow, newCol, distance + 1])
            }
        }
    }

    // 경로가 없는 경우
    return -1
}

module.exports = shortestPath
