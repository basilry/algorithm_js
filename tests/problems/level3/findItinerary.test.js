const findItinerary = require('../../../src/problems/level3/findItinerary');

describe('여행 경로 찾기 문제', () => {
  test('예제 1: [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]', () => {
    const tickets = [["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]];
    expect(findItinerary(tickets)).toEqual(["ICN", "JFK", "HND", "IAD"]);
  });

  test('예제 2: 여러 경로가 가능한 경우 알파벳 순서가 앞서는 경로 선택', () => {
    const tickets = [
      ["ICN", "SFO"], 
      ["ICN", "ATL"], 
      ["SFO", "ATL"], 
      ["ATL", "ICN"], 
      ["ATL", "SFO"]
    ];
    expect(findItinerary(tickets)).toEqual(["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]);
  });

  test('예제 3: 단일 항공권', () => {
    const tickets = [["ICN", "JFK"]];
    expect(findItinerary(tickets)).toEqual(["ICN", "JFK"]);
  });

  test('예제 4: 순환 경로', () => {
    const tickets = [["ICN", "A"], ["A", "B"], ["B", "ICN"]];
    expect(findItinerary(tickets)).toEqual(["ICN", "A", "B", "ICN"]);
  });

  test('예제 5: 복잡한 경로', () => {
    const tickets = [
      ["ICN", "B"], 
      ["ICN", "C"], 
      ["C", "D"], 
      ["D", "ICN"], 
      ["B", "Z"]
    ];
    expect(findItinerary(tickets)).toEqual(["ICN", "C", "D", "ICN", "B", "Z"]);
  });
}); 