/**
 * 배낭 문제 (동적 프로그래밍 - 레벨 2)
 * 배낭에 담을 수 있는 물건의 최대 가치를 계산
 * - 각 물건은 무게(weight)와 가치(value)를 가짐
 * - 배낭의 최대 무게 제한(capacity)이 있음
 * - 각 물건은 0개 또는 1개만 담을 수 있음 (0-1 Knapsack)
 *
 * @param {number[]} weights - 물건의 무게 배열
 * @param {number[]} values - 물건의 가치 배열
 * @param {number} capacity - 배낭의 최대 무게 제한
 * @returns {number} - 담을 수 있는 물건의 최대 가치 합계
 */
function knapsack(weights, values, capacity) {
    const n = weights.length

    // DP 테이블 초기화 (행: 물건 인덱스, 열: 배낭 무게)
    const dp = Array(n + 1)
        .fill()
        .map(() => Array(capacity + 1).fill(0))

    // 점화식:
    // dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i-1]] + values[i-1])
    // i번째 물건을 선택하지 않는 경우 vs 선택하는 경우
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // 현재 물건 무게가 배낭 무게보다 크면 담을 수 없음
            if (weights[i - 1] > w) {
                dp[i][w] = dp[i - 1][w]
            } else {
                // 현재 물건을 담지 않는 경우 vs 담는 경우
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
            }
        }
    }

    return dp[n][capacity]
}

/**
 * 배낭 문제의 공간 복잡도를 최적화한 버전
 * 2차원 배열 대신 1차원 배열을 사용하여 공간복잡도를 O(capacity)로 줄임
 *
 * @param {number[]} weights - 물건의 무게 배열
 * @param {number[]} values - 물건의 가치 배열
 * @param {number} capacity - 배낭의 최대 무게 제한
 * @returns {number} - 담을 수 있는 물건의 최대 가치 합계
 */
function knapsackOptimized(weights, values, capacity) {
    const n = weights.length

    // 1차원 DP 테이블 초기화
    const dp = Array(capacity + 1).fill(0)

    // 각 물건에 대해
    for (let i = 0; i < n; i++) {
        // 뒤에서부터 계산해야 각 물건을 한 번만 사용함
        for (let w = capacity; w >= weights[i]; w--) {
            // 현재 물건을 담지 않는 경우 vs 담는 경우
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i])
        }
    }

    return dp[capacity]
}

// 배낭 문제의 해답(담은 물건들)을 반환하는 버전
function knapsackWithItems(weights, values, capacity) {
    const n = weights.length

    // DP 테이블 초기화
    const dp = Array(n + 1)
        .fill()
        .map(() => Array(capacity + 1).fill(0))

    // DP 테이블 채우기
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] > w) {
                dp[i][w] = dp[i - 1][w]
            } else {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
            }
        }
    }

    // 선택된 물건 추적
    const selectedItems = []
    let w = capacity

    for (let i = n; i > 0; i--) {
        // 현재 물건이 포함된 경우
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(i - 1) // 0-based 인덱스로 변환
            w -= weights[i - 1]
        }
    }

    return {
        maxValue: dp[n][capacity],
        selectedItems: selectedItems.reverse(), // 원래 순서로 반환
    }
}

module.exports = {
    knapsack,
    knapsackOptimized,
    knapsackWithItems,
}
