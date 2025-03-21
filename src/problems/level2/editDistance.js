/**
 * 편집 거리 문제 (동적 계획법 - 레벨 2)
 * 두 문자열 간의 최소 편집 거리를 계산하는 함수
 * 편집 연산은 삽입, 삭제, 대체 세 가지가 있음
 *
 * @param {string} word1 - 첫 번째 문자열
 * @param {string} word2 - 두 번째 문자열
 * @returns {number} - 최소 편집 거리
 */
function minDistance(word1, word2) {
    const m = word1.length
    const n = word2.length

    // 예외 처리: 빈 문자열 케이스
    if (m === 0) return n
    if (n === 0) return m

    // DP 테이블 초기화: dp[i][j]는 word1의 처음 i개 문자를 word2의 처음 j개 문자로 변환하는 최소 편집 거리
    const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0))

    // 첫 번째 행과 열 초기화 (빈 문자열에서 다른 문자열로 변환하는 비용)
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j
    }

    // DP 테이블 채우기
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 현재 문자가 같은 경우, 이전 문자열들의 편집 거리를 그대로 사용
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // 세 가지 연산 중 최소 비용 선택:
                // 1. 삽입 (dp[i][j-1] + 1)
                // 2. 삭제 (dp[i-1][j] + 1)
                // 3. 대체 (dp[i-1][j-1] + 1)
                dp[i][j] = Math.min(
                    dp[i][j - 1] + 1, // 삽입
                    dp[i - 1][j] + 1, // 삭제
                    dp[i - 1][j - 1] + 1, // 대체
                )
            }
        }
    }

    return dp[m][n]
}

/**
 * 편집 거리를 계산하고 실제 편집 연산들을 반환하는 함수
 *
 * @param {string} word1 - 첫 번째 문자열
 * @param {string} word2 - 두 번째 문자열
 * @returns {Object} - 최소 편집 거리와 필요한 편집 연산 목록
 */
function minDistanceWithOperations(word1, word2) {
    const m = word1.length
    const n = word2.length

    // 예외 처리: 빈 문자열 케이스
    if (m === 0) {
        const operations = Array(n)
            .fill()
            .map((_, i) => ({
                type: "insert",
                position: i,
                char: word2[i],
            }))
        return { distance: n, operations }
    }

    if (n === 0) {
        const operations = Array(m)
            .fill()
            .map((_, i) => ({
                type: "delete",
                position: 0, // 항상 첫 번째 문자를 삭제 (인덱스는 변경되므로)
                char: word1[i],
            }))
        return { distance: m, operations }
    }

    // DP 테이블 초기화
    const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0))

    // 첫 번째 행과 열 초기화
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j
    }

    // DP 테이블 채우기
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(
                    dp[i][j - 1] + 1, // 삽입
                    dp[i - 1][j] + 1, // 삭제
                    dp[i - 1][j - 1] + 1, // 대체
                )
            }
        }
    }

    // 편집 연산 역추적
    const operations = []
    let i = m,
        j = n

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
            // 문자가 같으면 아무 연산 필요 없음
            i--
            j--
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            // 대체 연산
            operations.unshift({
                type: "replace",
                position: i - 1,
                oldChar: word1[i - 1],
                newChar: word2[j - 1],
            })
            i--
            j--
        } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            // 삽입 연산
            operations.unshift({
                type: "insert",
                position: i,
                char: word2[j - 1],
            })
            j--
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            // 삭제 연산
            operations.unshift({
                type: "delete",
                position: i - 1,
                char: word1[i - 1],
            })
            i--
        }
    }

    return { distance: dp[m][n], operations }
}

module.exports = {
    minDistance,
    minDistanceWithOperations,
}
