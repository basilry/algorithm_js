const { maxProfit, maxProfitWithDays } = require('../../../src/algorithms/problems/level2/maxProfit');

describe('주식 매매 최적 시점 문제 테스트', () => {
  describe('maxProfit 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      const prices = [7, 1, 5, 3, 6, 4];
      expect(maxProfit(prices)).toBe(5); // 1에 사서 6에 팔기
    });
    
    test('예제 2: 계속 하락하는 주가', () => {
      const prices = [7, 6, 4, 3, 1];
      expect(maxProfit(prices)).toBe(0); // 이익을 낼 수 없음
    });
    
    test('예제 3: 빈 배열', () => {
      expect(maxProfit([])).toBe(0);
    });
    
    test('예제 4: 원소가 하나인 배열', () => {
      expect(maxProfit([5])).toBe(0);
    });
    
    test('예제 5: 계속 상승하는 주가', () => {
      const prices = [1, 2, 3, 4, 5];
      expect(maxProfit(prices)).toBe(4); // 1에 사서 5에 팔기
    });
    
    test('예제 6: 큰 이익 후 더 큰 이익', () => {
      const prices = [3, 2, 6, 5, 0, 3];
      expect(maxProfit(prices)).toBe(4); // 2에 사서 6에 팔기
    });
  });
  
  describe('maxProfitWithDays 함수 테스트', () => {
    test('예제 1: 기본 테스트 케이스', () => {
      const prices = [7, 1, 5, 3, 6, 4];
      const result = maxProfitWithDays(prices);
      
      expect(result.profit).toBe(5);
      expect(result.buyDay).toBe(1); // 1에 구매
      expect(result.sellDay).toBe(4); // 6에 판매
    });
    
    test('예제 2: 계속 하락하는 주가', () => {
      const prices = [7, 6, 4, 3, 1];
      const result = maxProfitWithDays(prices);
      
      expect(result.profit).toBe(0);
      expect(result.buyDay).toBe(-1); // 구매하지 않음
      expect(result.sellDay).toBe(-1); // 판매하지 않음
    });
    
    test('예제 3: 빈 배열', () => {
      const result = maxProfitWithDays([]);
      
      expect(result.profit).toBe(0);
      expect(result.buyDay).toBe(-1);
      expect(result.sellDay).toBe(-1);
    });
    
    test('예제 4: 계속 상승하는 주가', () => {
      const prices = [1, 2, 3, 4, 5];
      const result = maxProfitWithDays(prices);
      
      expect(result.profit).toBe(4);
      expect(result.buyDay).toBe(0); // 1에 구매
      expect(result.sellDay).toBe(4); // 5에 판매
    });
    
    test('예제 5: 동일한 최대 이익이 여러 번 있는 경우', () => {
      const prices = [3, 1, 3, 1, 3];
      const result = maxProfitWithDays(prices);
      
      expect(result.profit).toBe(2);
      // 첫 번째 최대 이익 기회를 선택해야 함
      expect(prices[result.sellDay] - prices[result.buyDay]).toBe(2);
    });
  });
}); 