const { maxPathSum, maxPathSumWithPath } = require("../../../src/problems/level3/triangle")

describe("정수 삼각형 문제 테스트", () => {
    describe("maxPathSum 함수 테스트", () => {
        test("예제 1: 기본 테스트 케이스", () => {
            const triangle = [[5], [7, 8], [2, 3, 4], [4, 9, 6, 1]]
            expect(maxPathSum(triangle)).toBe(20) // 경로: 5→8→3→4
        })

        test("예제 2: 작은 삼각형", () => {
            const triangle = [[1], [2, 3]]
            expect(maxPathSum(triangle)).toBe(4) // 경로: 1→3
        })

        test("예제 3: 단일 요소 삼각형", () => {
            const triangle = [[7]]
            expect(maxPathSum(triangle)).toBe(7)
        })

        test("예제 4: 빈 삼각형", () => {
            const triangle = []
            expect(maxPathSum(triangle)).toBe(0)
        })

        test("예제 5: 더 큰 삼각형", () => {
            const triangle = [[3], [7, 4], [2, 4, 6], [8, 5, 9, 3], [1, 5, 7, 2, 6]]
            expect(maxPathSum(triangle)).toBe(28) // 경로: 3→7→4→9→5
        })

        test("예제 6: 삼각형에 음수가 포함된 경우", () => {
            const triangle = [[1], [-5, 2], [3, -2, 6]]
            expect(maxPathSum(triangle)).toBe(9) // 경로: 1→2→6
        })
    })

    describe("maxPathSumWithPath 함수 테스트", () => {
        test("예제 1: 기본 테스트 케이스", () => {
            const triangle = [[5], [7, 8], [2, 3, 4], [4, 9, 6, 1]]
            const result = maxPathSumWithPath(triangle)

            expect(result.maxSum).toBe(20)

            // 경로는 실제로 삼각형을 따라가야 합니다
            expect(result.path.length).toBe(4)
            expect(result.path[0]).toBe(5) // 시작점은 항상 꼭대기

            // 경로 합이 올바른지 확인
            expect(result.path.reduce((sum, val) => sum + val, 0)).toBe(20)

            // 경로가 실제로 유효한지 확인 (여러 경로가 가능할 수 있음)
            for (let i = 1; i < result.path.length; i++) {
                // 경로의 각 요소는 삼각형의 해당 행에 있어야 함
                expect(triangle[i]).toContain(result.path[i])
            }
        })

        test("예제 2: 작은 삼각형", () => {
            const triangle = [[1], [2, 3]]
            const result = maxPathSumWithPath(triangle)

            expect(result.maxSum).toBe(4)
            expect(result.path).toEqual([1, 3])
        })

        test("예제 3: 단일 요소 삼각형", () => {
            const triangle = [[7]]
            const result = maxPathSumWithPath(triangle)

            expect(result.maxSum).toBe(7)
            expect(result.path).toEqual([7])
        })

        test("예제 4: 빈 삼각형", () => {
            const triangle = []
            const result = maxPathSumWithPath(triangle)

            expect(result.maxSum).toBe(0)
            expect(result.path).toEqual([])
        })
    })
})
