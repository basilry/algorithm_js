/**
 * 모든 부분집합 찾기 (완전탐색 - 레벨 1)
 * 주어진 집합의 모든 부분집합을 찾는 함수
 *
 * @param {number[]} nums - 부분집합을 생성할 배열
 * @returns {number[][]} - 모든 부분집합을 담은 배열 (빈 집합 포함)
 */
function findAllSubsets(nums) {
    const result = [[]] // 빈 집합은 항상 부분집합에 포함

    // 비트마스킹을 이용한 부분집합 생성
    for (const num of nums) {
        // 현재 결과 크기
        const currentSize = result.length

        // 현재까지의 각 부분집합에 현재 숫자를 추가하여 새로운 부분집합 생성
        for (let i = 0; i < currentSize; i++) {
            result.push([...result[i], num])
        }
    }

    return result
}

/**
 * 재귀를 이용한 모든 부분집합 찾기 (대체 구현)
 *
 * @param {number[]} nums - 부분집합을 생성할 배열
 * @returns {number[][]} - 모든 부분집합을 담은 배열 (빈 집합 포함)
 */
function findAllSubsetsRecursive(nums) {
    const result = []

    function backtrack(start, currentSubset) {
        // 현재 부분집합을 결과에 추가
        result.push([...currentSubset])

        // 나머지 요소에 대해 재귀 호출
        for (let i = start; i < nums.length; i++) {
            // 현재 요소 선택
            currentSubset.push(nums[i])

            // 재귀 호출 (현재 위치 이후의 요소만 고려)
            backtrack(i + 1, currentSubset)

            // 백트래킹 (현재 요소 제거)
            currentSubset.pop()
        }
    }

    backtrack(0, [])
    return result
}

module.exports = {
    findAllSubsets,
    findAllSubsetsRecursive,
}
