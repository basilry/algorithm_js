/**
 * 섬의 개수 세기 (그래프 탐색 - 레벨 1)
 * 0(물)과 1(땅)이 표시된 2차원 그리드에서 섬의 개수를 세는 함수
 *
 * @param {number[][]} grid - 0과 1로 이루어진 2차원 배열
 * @returns {number} - 섬의 개수
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0

    const rows = grid.length
    const cols = grid[0].length
    let count = 0

    // DFS로 섬을 탐색하는 함수
    function dfs(row, col) {
        // 그리드 범위를 벗어나거나 물(0)이거나 이미 방문한 경우(2)
        if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] !== 1) {
            return
        }

        // 방문 표시 (1을 2로 변경)
        grid[row][col] = 2

        // 상하좌우 탐색
        dfs(row + 1, col)
        dfs(row - 1, col)
        dfs(row, col + 1)
        dfs(row, col - 1)
    }

    // 그리드 전체를 순회하며 미방문 섬 탐색
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                count++
                dfs(i, j)
            }
        }
    }

    return count
}

module.exports = numIslands
