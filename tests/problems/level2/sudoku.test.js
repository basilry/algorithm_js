const solveSudoku = require("../../../src/problems/level2/sudoku")

describe("스도쿠 풀기 문제", () => {
    test("예제 1: 기본 스도쿠 퍼즐 풀기", () => {
        const board = [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ]

        // 보드 복사 (참조 문제 방지)
        const originalBoard = board.map((row) => [...row])

        // 풀이 시도
        expect(solveSudoku(board)).toBe(true)

        // 각 행, 열, 3x3 블록에 1-9가 모두 있는지 확인
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set()
            const colSet = new Set()
            const blockSet = new Set()
            const blockRow = Math.floor(i / 3) * 3
            const blockCol = (i % 3) * 3

            for (let j = 0; j < 9; j++) {
                // 행 확인
                rowSet.add(board[i][j])

                // 열 확인
                colSet.add(board[j][i])

                // 3x3 블록 확인
                const r = blockRow + Math.floor(j / 3)
                const c = blockCol + (j % 3)
                blockSet.add(board[r][c])
            }

            // 각 집합은 1-9까지 모든 숫자를 포함해야 함
            expect(rowSet.size).toBe(9)
            expect(colSet.size).toBe(9)
            expect(blockSet.size).toBe(9)
        }

        // 원래 채워진 칸의 값이 보존되었는지 확인
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (originalBoard[i][j] !== ".") {
                    expect(board[i][j]).toBe(originalBoard[i][j])
                }
            }
        }
    })

    test("예제 2: 이미 완성된 스도쿠", () => {
        const board = [
            ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ]

        // 이미 완성된 스도쿠도 성공으로 처리됨
        expect(solveSudoku(board)).toBe(true)
    })

    test("예제 3: 빈 스도쿠 보드", () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill("."))

        // 빈 보드도 유효하게 채워질 수 있음
        expect(solveSudoku(board)).toBe(true)

        // 해결된 보드 검증
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set()
            for (let j = 0; j < 9; j++) {
                rowSet.add(board[i][j])
            }
            expect(rowSet.size).toBe(9)
        }
    })

    test("예제 4: 불가능한 스도쿠", () => {
        const board = [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            ["5", ".", ".", ".", "8", ".", ".", "7", "9"], // 첫 번째 열에 '5'가 중복됨
        ]

        // 불가능한 스도쿠는 false 반환
        expect(solveSudoku(board)).toBe(false)
    })
})
