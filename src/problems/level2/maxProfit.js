/**
 * 주식 매매 최적 시점 문제 (자료구조 활용 - 레벨 2)
 * 주식 가격 배열이 주어질 때, 한 번의 매수와 매도로 얻을 수 있는 최대 이익 계산
 * 
 * @param {number[]} prices - 주식 가격 배열
 * @returns {number} - 최대 이익 (이익을 낼 수 없으면 0 반환)
 */
function maxProfit(prices) {
  // 예외 처리: 배열이 비어있거나 길이가 1 이하인 경우
  if (!prices || prices.length <= 1) {
    return 0;
  }
  
  let minPrice = prices[0]; // 현재까지의 최소 가격
  let maxProfit = 0; // 최대 이익
  
  // 배열을 순회하며 최소 가격과 최대 이익 갱신
  for (let i = 1; i < prices.length; i++) {
    // 현재 가격이 최소 가격보다 낮으면 최소 가격 갱신
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } 
    // 현재 가격에서 최소 가격을 뺀 이익이 최대 이익보다 크면 최대 이익 갱신
    else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  
  return maxProfit;
}

/**
 * 주식 매매 최적 시점과 함께 매수 및 매도 날짜를 반환하는 함수
 * 
 * @param {number[]} prices - 주식 가격 배열
 * @returns {Object} - 최대 이익과 매수/매도 날짜(인덱스) 정보
 */
function maxProfitWithDays(prices) {
  // 예외 처리: 배열이 비어있거나 길이가 1 이하인 경우
  if (!prices || prices.length <= 1) {
    return { profit: 0, buyDay: -1, sellDay: -1 };
  }
  
  let minPrice = prices[0]; // 현재까지의 최소 가격
  let minPriceDay = 0; // 최소 가격의 날짜(인덱스)
  let maxProfit = 0; // 최대 이익
  let buyDay = -1; // 매수 날짜(인덱스)
  let sellDay = -1; // 매도 날짜(인덱스)
  
  // 배열을 순회하며 최소 가격과 최대 이익 갱신
  for (let i = 1; i < prices.length; i++) {
    // 현재 가격이 최소 가격보다 낮으면 최소 가격 갱신
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      minPriceDay = i;
    } 
    // 현재 가격에서 최소 가격을 뺀 이익이 최대 이익보다 크면 최대 이익 갱신
    else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
      buyDay = minPriceDay;
      sellDay = i;
    }
  }
  
  return { profit: maxProfit, buyDay, sellDay };
}

module.exports = {
  maxProfit,
  maxProfitWithDays
}; 