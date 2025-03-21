/**
 * 모든 순열 찾기 (완전탐색 - 레벨 1)
 * 주어진 숫자 배열의 모든 순열을 찾는 함수
 * 
 * @param {number[]} nums - 순열을 생성할 숫자 배열
 * @returns {number[][]} - 가능한 모든 순열을 담은 배열
 */
function findAllPermutations(nums) {
  const result = [];
  
  // 빈 배열 또는 원소가 하나인 경우
  if (nums.length <= 1) {
    return [nums];
  }
  
  // 백트래킹을 이용한 순열 생성
  function backtrack(tempArray, remainingNums) {
    // 모든 숫자를 사용했으면 결과에 추가
    if (remainingNums.length === 0) {
      result.push([...tempArray]);
      return;
    }
    
    // 남은 숫자들 중 하나를 선택하여 순열 생성
    for (let i = 0; i < remainingNums.length; i++) {
      // 현재 숫자 선택
      tempArray.push(remainingNums[i]);
      
      // 선택한 숫자를 제외한 나머지 숫자로 새 배열 생성
      const newRemaining = [...remainingNums.slice(0, i), ...remainingNums.slice(i + 1)];
      
      // 재귀 호출로 다음 숫자 선택
      backtrack(tempArray, newRemaining);
      
      // 백트래킹: 선택한 숫자 제거
      tempArray.pop();
    }
  }
  
  backtrack([], nums);
  return result;
}

module.exports = findAllPermutations; 