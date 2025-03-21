/**
 * 여행 경로 찾기 (그래프 탐색 - 레벨 3)
 * 주어진 항공권을 모두 사용하여 여행 경로 만들기
 *
 * @param {string[][]} tickets - 항공권 배열 (출발지, 도착지 쌍)
 * @returns {string[]} - 방문 공항 순서 배열
 */
function findItinerary(tickets) {
    // 그래프 구성 (출발지 -> 목적지들)
    const graph = {}

    // 그래프 초기화
    for (const [from, to] of tickets) {
        if (!graph[from]) {
            graph[from] = []
        }
        graph[from].push(to)
    }

    // 각 출발지에서 목적지를 알파벳 순으로 정렬
    // (여러 경로가 가능할 때 알파벳 순서가 앞서는 경로 선택)
    for (const from in graph) {
        graph[from].sort()
    }

    const result = []

    function dfs(airport) {
        // 현재 공항에서 출발하는 경로가 있는지 확인
        const destinations = graph[airport] || []

        // 현재 공항에서 갈 수 있는 모든 목적지 순회
        while (destinations.length > 0) {
            // 알파벳 순으로 가장 앞선 목적지 선택
            const nextAirport = destinations.shift()
            dfs(nextAirport)
        }

        // 더 이상 갈 곳이 없으면 현재 공항을 결과에 추가 (역순)
        result.push(airport)
    }

    // "ICN"에서 시작
    dfs("ICN")

    // DFS 결과는 역순으로 저장되므로 뒤집어서 반환
    return result.reverse()
}

module.exports = findItinerary
