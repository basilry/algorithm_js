/**
 * 스도쿠 풀기 (완전탐색 - 레벨 2)
 * 9x9 스도쿠 퍼즐을 백트래킹을 사용하여 해결하는 함수
 *
 * @param {string[][]} board - 스도쿠 보드 (9x9 배열, 빈 칸은 '.')
 * @returns {boolean} - 풀이 성공 여부
 */
function solveSudoku(board) {
    // 빈 칸 찾기
    function findEmpty() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === ".") {
                    return [i, j]
                }
            }
        }
        return null // 빈 칸이 없으면 완성된 것
    }

    // 해당 위치에 숫자 num을 놓을 수 있는지 확인
    function isValid(row, col, num) {
        // 같은 행에 중복된 숫자가 있는지 확인
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) {
                return false
            }
        }

        // 같은 열에 중복된 숫자가 있는지 확인
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false
            }
        }

        // 3x3 서브그리드 내에 중복된 숫자가 있는지 확인
        const boxRow = Math.floor(row / 3) * 3
        const boxCol = Math.floor(col / 3) * 3

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) {
                    return false
                }
            }
        }

        // 모든 검사를 통과하면 유효한 배치
        return true
    }

    // 백트래킹으로 스도쿠 풀기
    function solve() {
        const emptyPos = findEmpty()

        // 빈 칸이 없으면 완성된 것
        if (emptyPos === null) {
            return true
        }

        const [row, col] = emptyPos

        // 1부터 9까지 숫자를 시도
        for (let num = 1; num <= 9; num++) {
            const numStr = num.toString()

            // 해당 위치에 숫자를 놓을 수 있는지 확인
            if (isValid(row, col, numStr)) {
                // 숫자를 놓음
                board[row][col] = numStr

                // 재귀적으로 나머지 빈 칸 채우기
                if (solve()) {
                    return true
                }

                // 실패하면 백트래킹 (원래대로 되돌림)
                board[row][col] = "."
            }
        }

        // 1-9 중 어떤 숫자도 유효하지 않으면 실패
        return false
    }

    return solve()
}

module.exports = solveSudoku
