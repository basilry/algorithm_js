const numIslands = require("../../../src/problems/level1/islands")

describe("섬의 개수 세기 문제", () => {
    test("예제 1: [[1,1,0], [1,0,0], [0,0,1]] -> 2개의 섬", () => {
        const grid = [
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 1],
        ]
        expect(numIslands(grid)).toBe(2)
    })

    test("예제 2: 모두 물인 경우 0개의 섬", () => {
        const grid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
        expect(numIslands(grid)).toBe(0)
    })

    test("예제 3: 모두 땅인 경우 1개의 섬", () => {
        const grid = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ]
        expect(numIslands(grid)).toBe(1)
    })

    test("예제 4: 복잡한 지형에서 섬의 개수", () => {
        const grid = [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1],
        ]
        expect(numIslands(grid)).toBe(3)
    })

    test("예제 5: 빈 그리드는 0개의 섬", () => {
        expect(numIslands([])).toBe(0)
    })
})
