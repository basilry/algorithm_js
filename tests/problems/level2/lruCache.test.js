const LRUCache = require("../../../src/problems/level2/lruCache")

describe("LRU 캐시 구현 문제 테스트", () => {
    test("예제 1: 기본 작업 순서 테스트", () => {
        const lruCache = new LRUCache(2)

        // 캐시에 (1, 1) 추가
        lruCache.put(1, 1)

        // 캐시에 (2, 2) 추가
        lruCache.put(2, 2)

        // 키 1의 값을 조회 (1을 반환하고 1이 최근 사용됨으로 표시)
        expect(lruCache.get(1)).toBe(1)

        // 캐시에 (3, 3) 추가 (용량이 2이므로 가장 적게 사용된 키 2가 제거됨)
        lruCache.put(3, 3)

        // 키 2의 값을 조회 (이미 제거됐으므로 -1 반환)
        expect(lruCache.get(2)).toBe(-1)

        // 캐시에 (4, 4) 추가 (가장 적게 사용된 키 1이 제거됨)
        lruCache.put(4, 4)

        // 키 1의 값을 조회 (이미 제거됐으므로 -1 반환)
        expect(lruCache.get(1)).toBe(-1)

        // 키 3의 값을 조회 (3 반환)
        expect(lruCache.get(3)).toBe(3)

        // 키 4의 값을 조회 (4 반환)
        expect(lruCache.get(4)).toBe(4)
    })

    test("예제 2: 값 갱신 테스트", () => {
        const lruCache = new LRUCache(2)

        lruCache.put(1, 1)
        lruCache.put(2, 2)

        expect(lruCache.get(1)).toBe(1)

        // 키 2의 값을 5로 갱신
        lruCache.put(2, 5)

        // 키 1의 값은 변하지 않음
        expect(lruCache.get(1)).toBe(1)

        // 키 2의 값은 갱신됨
        expect(lruCache.get(2)).toBe(5)
    })

    test("예제 3: 용량이 1인 캐시 테스트", () => {
        const lruCache = new LRUCache(1)

        lruCache.put(1, 1)
        lruCache.put(2, 2)

        // 키 1은 이미 제거됨
        expect(lruCache.get(1)).toBe(-1)

        // 키 2만 캐시에 존재
        expect(lruCache.get(2)).toBe(2)
    })

    test("예제 4: 같은 키에 대한 반복 접근 테스트", () => {
        const lruCache = new LRUCache(2)

        lruCache.put(1, 1)
        lruCache.put(2, 2)

        // 키 1에 반복 접근하여 최근 사용됨으로 유지
        expect(lruCache.get(1)).toBe(1)
        expect(lruCache.get(1)).toBe(1)
        expect(lruCache.get(1)).toBe(1)

        // 키 3 추가 시 키 2가 제거됨 (키 1이 최근에 사용됨)
        lruCache.put(3, 3)

        expect(lruCache.get(2)).toBe(-1)
        expect(lruCache.get(1)).toBe(1)
        expect(lruCache.get(3)).toBe(3)
    })

    test("예제 5: 용량이 0인 캐시 테스트", () => {
        const lruCache = new LRUCache(0)

        lruCache.put(1, 1)

        // 용량이 0이므로 어떤 키도 저장되지 않음
        expect(lruCache.get(1)).toBe(-1)
    })
})
