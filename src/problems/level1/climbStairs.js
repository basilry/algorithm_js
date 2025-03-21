/**
 * 계단 오르기 문제 (동적 프로그래밍 - 레벨 1)
 * n개의 계단을 오르는 방법의 수를 계산하는 함수
 * 한 번에 1계단 또는 2계단씩 오를 수 있음
 * 
 * @param {number} n - 계단의 수
 * @returns {number} - n개의 계단을 오르는 방법의 수
 */
function climbStairs(n) {
  // 기본 케이스
  if (n <= 2) {
    return n;
  }
  
  // DP 테이블 초기화
  const dp = new Array(n + 1);
  dp[1] = 1; // 1개의 계단을 오르는 방법은 1가지
  dp[2] = 2; // 2개의 계단을 오르는 방법은 2가지 (1+1 또는 2)
  
  // 점화식: dp[i] = dp[i-1] + dp[i-2]
  // i번째 계단에 도달하는 방법은 i-1번째에서 1계단 오르거나, i-2번째에서 2계단 오르는 방법의 합
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 공간 복잡도를 줄인 최적화 버전
function climbStairsOptimized(n) {
  if (n <= 2) {
    return n;
  }
  
  let prev1 = 1; // dp[1]
  let prev2 = 2; // dp[2]
  let current;
  
  for (let i = 3; i <= n; i++) {
    current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }
  
  return prev2;
}

module.exports = {
  climbStairs,
  climbStairsOptimized
}; 