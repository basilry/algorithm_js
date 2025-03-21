/**
 * 최장 증가 부분 수열(LIS) 문제 (동적 프로그래밍 - 레벨 3)
 * 배열에서 가장 긴 증가하는 부분 수열의 길이를 찾는 함수
 *
 * @param {number[]} nums - 정수 배열
 * @returns {number} - 최장 증가 부분 수열의 길이
 */
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0

    const n = nums.length

    // DP 배열: dp[i]는 nums[i]를 마지막 원소로 하는 최장 증가 부분 수열의 길이
    const dp = Array(n).fill(1)

    // 점화식: dp[i] = max(dp[j] + 1) where j < i and nums[j] < nums[i]
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }

    // 최댓값 반환
    return Math.max(...dp)
}

/**
 * 최장 증가 부분 수열을 구하는 최적화된 버전 (이진 탐색 활용)
 * 시간 복잡도: O(n log n)
 *
 * @param {number[]} nums - 정수 배열
 * @returns {number} - 최장 증가 부분 수열의 길이
 */
function lengthOfLISOptimized(nums) {
    if (nums.length === 0) return 0

    const n = nums.length

    // tails[i]는 길이가 i+1인 증가 부분 수열의 마지막 원소 중 가장 작은 값
    const tails = []

    for (let num of nums) {
        // 이진 탐색으로 현재 수를 넣을 위치 찾기
        let left = 0
        let right = tails.length

        while (left < right) {
            const mid = Math.floor((left + right) / 2)
            if (tails[mid] < num) {
                left = mid + 1
            } else {
                right = mid
            }
        }

        // 현재 숫자가 모든 tails 요소보다 크면 추가
        if (left === tails.length) {
            tails.push(num)
        } else {
            // 그렇지 않으면 적절한 위치에 업데이트
            tails[left] = num
        }
    }

    return tails.length
}

/**
 * 최장 증가 부분 수열을 직접 구하는 함수
 *
 * @param {number[]} nums - 정수 배열
 * @returns {number[]} - 최장 증가 부분 수열
 */
function findLIS(nums) {
    if (nums.length === 0) return []

    const n = nums.length

    // dp[i]는 nums[i]를 마지막 원소로 하는 최장 증가 부분 수열의 길이
    const dp = Array(n).fill(1)

    // prev[i]는 nums[i]를 마지막 원소로 하는 최장 증가 부분 수열에서 바로 이전 원소의 인덱스
    const prev = Array(n).fill(-1)

    // dp 배열 채우기
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1
                prev[i] = j
            }
        }
    }

    // 최장 증가 부분 수열의 마지막 원소 인덱스 찾기
    let maxLength = 0
    let lastIndex = -1

    for (let i = 0; i < n; i++) {
        if (dp[i] > maxLength) {
            maxLength = dp[i]
            lastIndex = i
        }
    }

    // 최장 증가 부분 수열 구성
    const lis = []

    while (lastIndex !== -1) {
        lis.unshift(nums[lastIndex])
        lastIndex = prev[lastIndex]
    }

    return lis
}

module.exports = {
    lengthOfLIS,
    lengthOfLISOptimized,
    findLIS,
}
