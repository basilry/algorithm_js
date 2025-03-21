const canPartitionKSubsets = require("../../../src/problems/level3/partitionKSubsets")

describe("배열을 K개의 부분집합으로 분할하는 문제 테스트", () => {
    test("배열 [4, 3, 2, 3, 5, 2, 1]을 k=4로 분할 가능해야 함 (목표합: 5)", () => {
        const nums = [4, 3, 2, 3, 5, 2, 1]
        const k = 4

        expect(canPartitionKSubsets(nums, k)).toBe(true)
        // 가능한 분할 예: [1,4], [2,3], [2,3], [5]
    })

    test("배열 [1, 2, 3, 4]를 k=3으로 분할 불가능해야 함", () => {
        const nums = [1, 2, 3, 4]
        const k = 3

        expect(canPartitionKSubsets(nums, k)).toBe(false)
        // 합이 10이고, 10 ÷ 3 = 3.33으로 정수가 아님
    })

    test("배열 [2, 2, 2, 2, 3, 4, 5]을 k=4로 분할 불가능해야 함", () => {
        const nums = [2, 2, 2, 2, 3, 4, 5]
        const k = 4

        // 합은 20이고 목표합은 5, 그러나 [2,3], [2,3], [5], [2,2,1]로 분할할 수 없음
        // 실제로 이 배열의 요소 합은 2+2+2+2+3+4+5 = 20이므로 k=4일 때 각 부분집합의 합은 5가 되어야 함
        // 그러나 주어진 숫자로는 정확히 합이 5인 4개의 부분집합으로 나눌 수 없음
        expect(canPartitionKSubsets(nums, k)).toBe(false)
    })

    test("배열 [10, 10, 10, 7, 7, 7, 7, 7, 7, 6, 6, 6]을 k=3으로 분할 가능해야 함 (목표합: 30)", () => {
        const nums = [10, 10, 10, 7, 7, 7, 7, 7, 7, 6, 6, 6]
        const k = 3

        expect(canPartitionKSubsets(nums, k)).toBe(true)
        // 가능한 분할 예: [10,10,10], [7,7,7,7,6], [7,7,6,6,6]
    })

    test("배열 [5, 5, 5, 5]를 k=2로 분할 가능해야 함", () => {
        const nums = [5, 5, 5, 5]
        const k = 2

        expect(canPartitionKSubsets(nums, k)).toBe(true)
        // 가능한 분할 예: [5,5], [5,5]
    })

    test("하나의 숫자가 목표합보다 큰 경우 분할 불가능해야 함", () => {
        const nums = [1, 2, 3, 8]
        const k = 2

        expect(canPartitionKSubsets(nums, k)).toBe(false)
        // 합이 14이고 목표합은 7, 그러나 8 > 7
    })

    test("k가 배열 길이보다 큰 경우 분할 불가능해야 함", () => {
        const nums = [1, 2, 3]
        const k = 4

        expect(canPartitionKSubsets(nums, k)).toBe(false)
    })

    test("빈 배열은 k=0인 경우에만 분할 가능해야 함", () => {
        expect(canPartitionKSubsets([], 0)).toBe(true)
        expect(canPartitionKSubsets([], 1)).toBe(false)
    })
})
