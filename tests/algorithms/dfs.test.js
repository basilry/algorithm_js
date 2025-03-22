const { dfs, findTargetNumber, findTargetNumberOptimized, countNetworks } = require('../../src/algorithms/dfs');

describe('깊이 우선 탐색(DFS) 테스트', () => {
    test('단순 그래프에서 DFS 순회 테스트', () => {
        // 간단한 그래프 생성
        const graph = {
            A: ['B', 'C'],
            B: ['A', 'D', 'E'],
            C: ['A', 'F'],
            D: ['B'],
            E: ['B', 'F'],
            F: ['C', 'E'],
        };

        // A에서 시작하는 DFS 순회
        const result = dfs(graph, 'A');

        // 정확한 순서는 구현에 따라 달라질 수 있으나, 모든 노드가 방문되어야 함
        expect(result).toContain('A');
        expect(result).toContain('B');
        expect(result).toContain('C');
        expect(result).toContain('D');
        expect(result).toContain('E');
        expect(result).toContain('F');
        expect(result.length).toBe(6);
    });

    test('연결되지 않은 노드가 있는 그래프 테스트', () => {
        const graph = {
            1: ['2', '3'],
            2: ['1', '4'],
            3: ['1'],
            4: ['2'],
            5: ['6'],
            6: ['5'],
        };

        // 1에서 시작하는 DFS 순회 - 5, 6에 도달할 수 없음
        const result = dfs(graph, '1');
        expect(result).toEqual(expect.arrayContaining(['1', '2', '3', '4']));
        expect(result).not.toContain('5');
        expect(result).not.toContain('6');
        expect(result.length).toBe(4);

        // 5에서 시작하는 DFS - 1, 2, 3, 4에 도달할 수 없음
        const result2 = dfs(graph, '5');
        expect(result2).toEqual(expect.arrayContaining(['5', '6']));
        expect(result2).not.toContain('1');
        expect(result2).not.toContain('2');
        expect(result2).not.toContain('3');
        expect(result2).not.toContain('4');
        expect(result2.length).toBe(2);
    });

    test('노드가 하나인 그래프 테스트', () => {
        const graph = {
            A: [],
        };

        const result = dfs(graph, 'A');
        expect(result).toEqual(['A']);
    });

    test('존재하지 않는 노드로 시작하는 경우', () => {
        const graph = {
            A: ['B'],
            B: ['A'],
        };

        const result = dfs(graph, 'C');
        expect(result).toEqual(['C']);
    });
});

describe('타겟 넘버 문제 테스트', () => {
    test('DFS 방식으로 풀기 - 예제 1', () => {
        const numbers = [1, 1, 1, 1, 1];
        const target = 3;
        expect(findTargetNumber(numbers, target)).toBe(5);
    });
    
    test('DFS 방식으로 풀기 - 예제 2', () => {
        const numbers = [4, 1, 2, 1];
        const target = 4;
        expect(findTargetNumber(numbers, target)).toBe(2);
    });
    
    test('빈 배열 테스트', () => {
        const numbers = [];
        const target = 0;
        expect(findTargetNumber(numbers, target)).toBe(1); // 빈 배열이면 합이 0이므로 target=0일 경우 1가지 방법
    });
    
    test('단일 요소 배열 테스트', () => {
        const numbers = [5];
        const target = 5;
        expect(findTargetNumber(numbers, target)).toBe(1); // +5 = 5
        
        const target2 = -5;
        expect(findTargetNumber(numbers, target2)).toBe(1); // -5 = -5
    });
    
    test('도달할 수 없는 타겟 테스트', () => {
        const numbers = [1, 2, 3];
        const target = 100;
        expect(findTargetNumber(numbers, target)).toBe(0); // 어떤 방법으로도 100을 만들 수 없음
    });
});

describe('타겟 넘버 최적화 버전 테스트', () => {
    test('최적화 DFS 방식으로 풀기 - 예제 1', () => {
        const numbers = [1, 1, 1, 1, 1];
        const target = 3;
        expect(findTargetNumberOptimized(numbers, target)).toBe(5);
    });
    
    test('최적화 DFS 방식으로 풀기 - 예제 2', () => {
        const numbers = [4, 1, 2, 1];
        const target = 4;
        expect(findTargetNumberOptimized(numbers, target)).toBe(2);
    });
    
    test('최적화 - 큰 배열 성능 테스트', () => {
        // 큰 배열에서도 메모이제이션으로 인해 빠르게 처리되어야 함
        const numbers = Array(15).fill(1); // 15개의 1로 구성된 배열
        const target = 3;
        
        // 시간 측정 시작
        const startTime = Date.now();
        const result = findTargetNumberOptimized(numbers, target);
        const endTime = Date.now();
        
        // 결과 확인 및 시간 체크
        expect(result).toBeGreaterThan(0);
        expect(endTime - startTime).toBeLessThan(1000); // 1초 이내에 계산되어야 함
    });
    
    test('최적화 - 빈 배열 테스트', () => {
        const numbers = [];
        const target = 0;
        expect(findTargetNumberOptimized(numbers, target)).toBe(1);
    });
    
    test('최적화 - 도달할 수 없는 타겟 테스트', () => {
        const numbers = [1, 2, 3];
        const target = 100;
        expect(findTargetNumberOptimized(numbers, target)).toBe(0);
    });
});

describe('네트워크 개수 계산 테스트', () => {
    test('두 개의 네트워크가 있는 경우', () => {
        const n = 3;
        const computers = [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 1]
        ];
        expect(countNetworks(n, computers)).toBe(2);
    });
    
    test('한 개의 네트워크가 있는 경우', () => {
        const n = 3;
        const computers = [
            [1, 1, 0],
            [1, 1, 1],
            [0, 1, 1]
        ];
        expect(countNetworks(n, computers)).toBe(1);
    });
    
    test('모든 컴퓨터가 독립적인 경우', () => {
        const n = 3;
        const computers = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        expect(countNetworks(n, computers)).toBe(3);
    });
    
    test('컴퓨터가 하나인 경우', () => {
        const n = 1;
        const computers = [[1]];
        expect(countNetworks(n, computers)).toBe(1);
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
        expect(countNetworks(n, computers)).toBe(1);
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
        expect(countNetworks(n, computers)).toBe(3);
    });
}); 