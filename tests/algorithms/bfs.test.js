const { bfs, shortestPathInGameMap, shortestPathSimple, shortestPathEfficient, findTargetNumber, countNetworksBFS } = require("../../src/algorithms/bfs")

describe("너비 우선 탐색(BFS) 테스트", () => {
    test("단순 그래프에서 BFS 순회 테스트", () => {
        // 간단한 그래프 생성
        const graph = {
            A: ["B", "C"],
            B: ["A", "D", "E"],
            C: ["A", "F"],
            D: ["B"],
            E: ["B", "F"],
            F: ["C", "E"],
        }

        // A에서 시작하는 BFS 순회
        const result = bfs(graph, "A")

        // BFS 결과: A -> (A의 모든 인접 노드) -> (B의 인접 노드들) -> (C의 인접 노드들) ...
        expect(result).toEqual(["A", "B", "C", "D", "E", "F"])
    })

    test("연결되지 않은 노드가 있는 그래프 테스트", () => {
        const graph = {
            1: ["2", "3"],
            2: ["1", "4"],
            3: ["1"],
            4: ["2"],
            5: ["6"],
            6: ["5"],
        }

        // 1에서 시작하는 BFS 순회 - 5, 6에 도달할 수 없음
        const result = bfs(graph, "1")
        expect(result).toEqual(["1", "2", "3", "4"])

        // 5에서 시작하는 BFS - 1, 2, 3, 4에 도달할 수 없음
        const result2 = bfs(graph, "5")
        expect(result2).toEqual(["5", "6"])
    })

    test("싸이클이 있는 그래프 테스트", () => {
        const graph = {
            X: ["Y", "Z"],
            Y: ["X", "Z"],
            Z: ["X", "Y"],
        }

        const result = bfs(graph, "X")
        expect(result).toEqual(["X", "Y", "Z"])
    })

    test("노드가 하나인 그래프 테스트", () => {
        const graph = {
            A: [],
        }

        const result = bfs(graph, "A")
        expect(result).toEqual(["A"])
    })

    test("존재하지 않는 노드로 시작하는 경우", () => {
        const graph = {
            A: ["B"],
            B: ["A"],
        }

        const result = bfs(graph, "C")
        expect(result).toEqual(["C"])
    })

    test("가중치 그래프에서 최단 경로 찾기 시뮬레이션", () => {
        // 이 테스트는 BFS의 가중치 그래프 최단 경로 응용 시나리오를 보여줍니다
        // BFS는 각 간선의 가중치가 동일할 때 최단 경로를 찾을 수 있습니다

        const graph = {
            S: ["A", "B"], // 출발점 S에서 A와 B로 갈 수 있음
            A: ["S", "C", "D"], // A에서 S, C, D로 갈 수 있음
            B: ["S", "D", "E"], // ...
            C: ["A", "F"],
            D: ["A", "B", "F", "G"],
            E: ["B", "G"],
            F: ["C", "D", "Goal"],
            G: ["D", "E", "Goal"],
            Goal: ["F", "G"],
        }

        // S에서 시작하는 BFS는 S로부터의 거리가 증가하는 순서대로 노드를 방문합니다
        const visitOrder = bfs(graph, "S")

        // S의 인접 노드들(거리 1), 그 다음은 거리 2의 노드들, ...
        expect(visitOrder.indexOf("S")).toBe(0) // S는 항상 첫 번째

        // S의 직접 이웃들은 A와 B (거리 1)
        expect(visitOrder.indexOf("A")).toBeLessThan(visitOrder.indexOf("C"))
        expect(visitOrder.indexOf("A")).toBeLessThan(visitOrder.indexOf("D"))
        expect(visitOrder.indexOf("B")).toBeLessThan(visitOrder.indexOf("E"))

        // Goal은 거리 3에 있으므로 마지막 노드들 중 하나여야 함
        expect(visitOrder.indexOf("Goal")).toBeGreaterThan(visitOrder.indexOf("F"))
        expect(visitOrder.indexOf("Goal")).toBeGreaterThan(visitOrder.indexOf("G"))
    })
})

describe("게임 맵 최단거리 테스트", () => {
    test("도착점에 도달할 수 있는 경우", () => {
        const maps = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1],
            [0, 0, 0, 0, 1],
        ]
        expect(shortestPathInGameMap(maps)).toBe(11)
    })

    test("다른 경로로 도착점에 도달하는 경우", () => {
        const maps = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1],
        ]
        expect(shortestPathInGameMap(maps)).toBe(-1)
    })

    test("벽으로 둘러싸인 경우", () => {
        const maps = [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [1, 1, 1, 0, 1],
        ]
        expect(shortestPathInGameMap(maps)).toBe(-1)
    })

    test("최소 크기 맵", () => {
        const maps = [
            [1, 1],
            [1, 1],
        ]
        expect(shortestPathInGameMap(maps)).toBe(3)
    })

    test("시작점이 벽인 경우", () => {
        const maps = [
            [0, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ]
        expect(shortestPathInGameMap(maps)).toBe(-1)
    })

    test("도착점이 벽인 경우", () => {
        const maps = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 0],
        ]
        expect(shortestPathInGameMap(maps)).toBe(-1)
    })

    test("지그재그 경로", () => {
        const maps = [
            [1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1],
            [0, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1],
        ]
        expect(shortestPathInGameMap(maps)).toBe(9)
    })
})

describe("간결한 최단거리 함수 테스트", () => {
    test("기본 경로 테스트", () => {
        const maps = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1],
            [0, 0, 0, 0, 1],
        ]
        expect(shortestPathSimple(maps)).toBe(11)
    })

    test("도달 불가능 경로 테스트", () => {
        const maps = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1],
        ]
        expect(shortestPathSimple(maps)).toBe(-1)
    })

    test("최소 맵 테스트", () => {
        const maps = [
            [1, 1],
            [1, 1],
        ]
        expect(shortestPathSimple(maps)).toBe(3)
    })
})

describe("효율적인 최단거리 함수 테스트", () => {
    test("기본 경로 테스트", () => {
        const maps = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1],
            [0, 0, 0, 0, 1],
        ]
        expect(shortestPathEfficient(maps)).toBe(11)
    })

    test("도달 불가능 경로 테스트", () => {
        const maps = [
            [1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1],
        ]
        expect(shortestPathEfficient(maps)).toBe(-1)
    })

    test("최소 맵 테스트", () => {
        const maps = [
            [1, 1],
            [1, 1],
        ]
        expect(shortestPathEfficient(maps)).toBe(3)
    })
    
    test("원본 맵 보존 테스트", () => {
        const original = [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
        ]
        const copy = original.map(row => [...row])
        
        shortestPathEfficient(original)
        // 원본 맵이 수정되지 않았는지 확인
        expect(original).toEqual(copy)
    })
})

describe("타겟 넘버 문제 테스트", () => {
    test("BFS 방식으로 풀기 - 예제 1", () => {
        const numbers = [1, 1, 1, 1, 1]
        const target = 3
        expect(findTargetNumber(numbers, target)).toBe(5)
    })
    
    test("BFS 방식으로 풀기 - 예제 2", () => {
        const numbers = [4, 1, 2, 1]
        const target = 4
        expect(findTargetNumber(numbers, target)).toBe(2)
    })
    
    test("빈 배열 테스트", () => {
        const numbers = []
        const target = 0
        expect(findTargetNumber(numbers, target)).toBe(1) // 빈 배열이면 합이 0이므로 target=0일 경우 1가지 방법
    })
    
    test("단일 요소 배열 테스트", () => {
        const numbers = [5]
        const target = 5
        expect(findTargetNumber(numbers, target)).toBe(1) // +5 = 5
        
        const target2 = -5
        expect(findTargetNumber(numbers, target2)).toBe(1) // -5 = -5
    })
    
    test("도달할 수 없는 타겟 테스트", () => {
        const numbers = [1, 2, 3]
        const target = 100
        expect(findTargetNumber(numbers, target)).toBe(0) // 어떤 방법으로도 100을 만들 수 없음
    })
})

describe('네트워크 개수 계산 테스트 (BFS)', () => {
    test('두 개의 네트워크가 있는 경우', () => {
        const n = 3;
        const computers = [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 1]
        ];
        expect(countNetworksBFS(n, computers)).toBe(2);
    });
    
    test('한 개의 네트워크가 있는 경우', () => {
        const n = 3;
        const computers = [
            [1, 1, 0],
            [1, 1, 1],
            [0, 1, 1]
        ];
        expect(countNetworksBFS(n, computers)).toBe(1);
    });
    
    test('모든 컴퓨터가 독립적인 경우', () => {
        const n = 3;
        const computers = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        expect(countNetworksBFS(n, computers)).toBe(3);
    });
    
    test('컴퓨터가 하나인 경우', () => {
        const n = 1;
        const computers = [[1]];
        expect(countNetworksBFS(n, computers)).toBe(1);
    });
    
    test('여러 컴퓨터가 일렬로 연결된 경우', () => {
        const n = 5;
        const computers = [
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1],
            [0, 0, 0, 1, 1]
        ];
        expect(countNetworksBFS(n, computers)).toBe(1);
    });
    
    test('여러 개의 네트워크가 있는 복잡한 경우', () => {
        const n = 6;
        const computers = [
            [1, 1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 1]
        ];
        expect(countNetworksBFS(n, computers)).toBe(3);
    });
});
