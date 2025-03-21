/**
 * 숫자 조합 (완전탐색 - 레벨 2)
 * 1부터 9까지의 숫자 중 일부를 사용하여 합이 특정 값이 되는 모든 조합 찾기
 *
 * @param {number} targetSum - 목표 합
 * @param {number} k - 조합에 포함될 숫자의 개수 (선택 사항)
 * @returns {number[][]} - 목표 합을 만드는 모든 조합 배열
 */
function findCombinationSum(targetSum, k = null) {
    const result = []
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // 예외 처리: 목표합이 0 이하인 경우
    if (targetSum <= 0) {
        return []
    }

    // 백트래킹을 이용한 조합 탐색
    function backtrack(start, currentCombination, currentSum) {
        // 현재 합이 목표와 일치하고, k가 지정되었다면 조합의 크기도 k와 일치해야 함
        if (currentSum === targetSum) {
            if (k === null || currentCombination.length === k) {
                result.push([...currentCombination])
            }
            return
        }

        // 이미 합이 초과되었거나, k가 지정된 경우 조합의 크기가 k를 초과한 경우 중단
        if (currentSum > targetSum || (k !== null && currentCombination.length >= k)) {
            return
        }

        // 남은 숫자들에 대해 재귀 호출
        for (let i = start; i < numbers.length; i++) {
            // 현재 숫자 선택
            currentCombination.push(numbers[i])

            // 재귀 호출
            backtrack(i + 1, currentCombination, currentSum + numbers[i])

            // 백트래킹 (현재 숫자 제거)
            currentCombination.pop()
        }
    }

    backtrack(0, [], 0)
    return result
}

module.exports = findCombinationSum
