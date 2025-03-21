/**
 * 동적 계획법을 사용한 최대 부분합 계산
 * @param {number[]} arr - 정수 배열
 * @returns {number} 최대 부분합
 */
function maxSubarraySum(arr) {
  if (arr.length === 0) return 0;
  
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

/**
 * 동적 계획법을 사용한 계단 오르기 문제
 * @param {number} n - 계단 수
 * @returns {number} 계단을 오르는 방법의 수
 */
function climbStairs(n) {
  if (n <= 2) return n;
  
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

module.exports = {
  maxSubarraySum,
  climbStairs
}; 