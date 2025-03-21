/**
 * 정수 삼각형 문제 (동적 계획법 - 레벨 3)
 * 삼각형의 꼭대기에서 바닥까지 이동하면서 모을 수 있는 최대 합 계산
 * 각 단계에서는 현재 위치에서 대각선 아래 왼쪽 또는 오른쪽으로만 이동 가능
 * 
 * @param {number[][]} triangle - 정수 삼각형 배열
 * @returns {number} - 최대 경로 합
 */
function maxPathSum(triangle) {
  // 예외 처리: 빈 삼각형
  if (!triangle || triangle.length === 0) {
    return 0;
  }
  
  // 높이가 1인 삼각형
  if (triangle.length === 1) {
    return triangle[0][0];
  }
  
  // DP 배열 초기화 - triangle을 복사해서 사용
  const dp = triangle.map(row => [...row]);
  
  // 아래에서 위로 계산 (bottom-up)
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      // 현재 위치에서 아래 두 경로 중 더 큰 값을 선택
      dp[i][j] += Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }
  
  // 최상단 값이 최대 경로 합
  return dp[0][0];
}

/**
 * 최대 경로 합과 해당 경로를 반환하는 함수
 * 
 * @param {number[][]} triangle - 정수 삼각형 배열
 * @returns {Object} - 최대 경로 합과 경로
 */
function maxPathSumWithPath(triangle) {
  // 예외 처리: 빈 삼각형
  if (!triangle || triangle.length === 0) {
    return { maxSum: 0, path: [] };
  }
  
  // 높이가 1인 삼각형
  if (triangle.length === 1) {
    return { maxSum: triangle[0][0], path: [triangle[0][0]] };
  }
  
  // DP 배열 초기화
  const dp = triangle.map(row => [...row]);
  
  // 경로 추적을 위한 배열
  const pathChoices = Array(triangle.length - 1).fill().map(() => []);
  
  // 아래에서 위로 계산 (bottom-up)
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      // 아래 두 경로 중 더 큰 값의 방향 선택
      if (dp[i + 1][j] > dp[i + 1][j + 1]) {
        dp[i][j] += dp[i + 1][j];
        pathChoices[i][j] = 0; // 왼쪽 아래 선택
      } else {
        dp[i][j] += dp[i + 1][j + 1];
        pathChoices[i][j] = 1; // 오른쪽 아래 선택
      }
    }
  }
  
  // 경로 추적
  const path = [triangle[0][0]];
  let row = 0, col = 0;
  
  while (row < triangle.length - 1) {
    const choice = pathChoices[row][col];
    row++;
    if (choice === 1) {
      col++;
    }
    path.push(triangle[row][col]);
  }
  
  return { maxSum: dp[0][0], path };
}

module.exports = {
  maxPathSum,
  maxPathSumWithPath
}; 