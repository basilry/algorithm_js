/**
 * 배열을 K개의 부분집합으로 분할하는 문제 (완전탐색 - 레벨 3)
 * 주어진 배열을 합이 동일한 K개의 부분집합으로 분할할 수 있는지 확인
 * 
 * @param {number[]} nums - 분할할 정수 배열
 * @param {number} k - 목표 부분집합 개수
 * @returns {boolean} - K개의 부분집합으로 분할 가능 여부
 */
function canPartitionKSubsets(nums, k) {
  // 특수 케이스: k=0이고 배열이 비어있으면 true
  if (k === 0 && nums.length === 0) return true;
  
  // 예외 처리
  if (k <= 0 || k > nums.length) return false;
  
  const sum = nums.reduce((acc, num) => acc + num, 0);
  
  // 합계가 k로 나누어떨어지지 않으면 불가능
  if (sum % k !== 0) return false;
  
  const targetSum = sum / k;
  
  // 어떤 수가 목표 합보다 크면 불가능
  if (Math.max(...nums) > targetSum) return false;
  
  // 효율성을 위해 내림차순 정렬 (큰 수부터 배치)
  nums.sort((a, b) => b - a);
  
  // 각 부분집합의 현재 합계를 저장하는 배열
  const subsetSums = Array(k).fill(0);
  
  // 백트래킹으로 해결
  function backtrack(index) {
    // 모든 숫자를 배치했으면 성공
    if (index === nums.length) {
      // 모든 부분집합의 합이 동일한지 확인
      return subsetSums.every(sum => sum === targetSum);
    }
    
    // 현재 숫자를 각 부분집합에 추가해보기
    const seen = new Set(); // 중복된 부분집합 시도 방지
    
    for (let i = 0; i < k; i++) {
      // 이미 같은 합계의 부분집합을 시도했으면 건너뛰기
      if (seen.has(subsetSums[i])) continue;
      
      // 현재 부분집합에 숫자를 추가했을 때 목표합을 초과하면 건너뛰기
      if (subsetSums[i] + nums[index] > targetSum) continue;
      
      // 시도한 합계 기록
      seen.add(subsetSums[i]);
      
      // 현재 숫자를 i번째 부분집합에 추가
      subsetSums[i] += nums[index];
      
      // 다음 숫자 처리
      if (backtrack(index + 1)) {
        return true;
      }
      
      // 백트래킹
      subsetSums[i] -= nums[index];
    }
    
    return false;
  }
  
  return backtrack(0);
}

module.exports = canPartitionKSubsets; 