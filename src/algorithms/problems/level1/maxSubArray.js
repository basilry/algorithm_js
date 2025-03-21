/**
 * 최대 부분합 문제 (동적 계획법 - 레벨 1)
 * 배열에서 연속된 부분배열의 최대 합을 구하는 함수
 * 
 * @param {number[]} nums - 정수 배열
 * @returns {number} - 최대 부분합
 */
function maxSubArray(nums) {
  // 예외 처리: 빈 배열인 경우
  if (nums.length === 0) {
    return 0;
  }
  
  // 첫 번째 요소로 최대값 초기화
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  // 배열의 두 번째 요소부터 순회
  for (let i = 1; i < nums.length; i++) {
    // 현재 요소부터 새로 시작하는 것이 더 큰지 또는 이전 부분합에 현재 요소를 더하는 것이 더 큰지 비교
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    
    // 최대값 갱신
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

/**
 * 최대 부분합을 구하면서 부분배열의 시작과 끝 인덱스도 반환하는 함수
 * 
 * @param {number[]} nums - 정수 배열
 * @returns {Object} - 최대 부분합과 해당 부분배열의 시작 및 끝 인덱스를 포함하는 객체
 */
function maxSubArrayWithIndices(nums) {
  // 예외 처리: 빈 배열인 경우
  if (nums.length === 0) {
    return { maxSum: 0, start: -1, end: -1 };
  }
  
  let maxSum = nums[0];
  let currentSum = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;
  
  // 배열의 두 번째 요소부터 순회
  for (let i = 1; i < nums.length; i++) {
    // 현재 요소부터 새로 시작하는 것이 더 나은 경우
    if (nums[i] > currentSum + nums[i]) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      // 이전 부분합에 현재 요소를 더하는 경우
      currentSum = currentSum + nums[i];
    }
    
    // 최대값 갱신
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }
  
  return { maxSum, start, end };
}

module.exports = {
  maxSubArray,
  maxSubArrayWithIndices
}; 