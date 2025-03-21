/**
 * LRU 캐시 구현 문제 (자료구조 활용 - 레벨 2)
 * 최소 사용(Least Recently Used) 캐시 알고리즘 구현
 * 해시맵과 이중 연결 리스트를 사용하여 O(1) 시간 복잡도로 get/put 연산 구현
 */

// 이중 연결 리스트의 노드 클래스
class Node {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.prev = null
        this.next = null
    }
}

class LRUCache {
    /**
     * LRU 캐시 초기화
     * @param {number} capacity - 캐시의 용량 (저장할 수 있는 키-값 쌍의 최대 개수)
     */
    constructor(capacity) {
        this.capacity = capacity
        this.size = 0
        this.cache = {} // 키-노드 맵

        // 이중 연결 리스트의 더미 헤드와 테일 생성
        this.head = new Node(0, 0) // 더미 헤드
        this.tail = new Node(0, 0) // 더미 테일

        // 헤드와 테일 연결
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    /**
     * 노드를 리스트의 앞쪽(가장 최근에 사용됨)으로 이동
     * @param {Node} node - 이동할 노드
     * @private
     */
    _moveToHead(node) {
        this._removeNode(node)
        this._addToHead(node)
    }

    /**
     * 노드를 리스트에서 제거
     * @param {Node} node - 제거할 노드
     * @private
     */
    _removeNode(node) {
        const prev = node.prev
        const next = node.next

        prev.next = next
        next.prev = prev
    }

    /**
     * 노드를 리스트의 앞쪽에 추가
     * @param {Node} node - 추가할 노드
     * @private
     */
    _addToHead(node) {
        node.prev = this.head
        node.next = this.head.next

        this.head.next.prev = node
        this.head.next = node
    }

    /**
     * 리스트의 마지막(가장 적게 사용됨) 노드를 제거하고 반환
     * @returns {Node} - 제거된 노드
     * @private
     */
    _popTail() {
        const lastNode = this.tail.prev
        this._removeNode(lastNode)
        return lastNode
    }

    /**
     * 키에 해당하는 값을 가져옴
     * 해당 키가 캐시에 존재하면 값을 반환하고 노드를 최근 사용으로 표시
     * 존재하지 않으면 -1 반환
     * @param {number} key - 가져올 값의 키
     * @returns {number} - 키에 해당하는 값 또는 -1
     */
    get(key) {
        if (!(key in this.cache)) {
            return -1
        }

        const node = this.cache[key]
        this._moveToHead(node)
        return node.value
    }

    /**
     * 키-값 쌍을 캐시에 추가/갱신
     * 키가 이미 존재하면 값을 갱신하고 최근 사용으로 표시
     * 키가 없고 캐시가 꽉 찼으면 가장 오래된(적게 사용된) 항목 제거 후 추가
     * @param {number} key - 추가/갱신할 키
     * @param {number} value - 추가/갱신할 값
     */
    put(key, value) {
        // 이미 캐시에 존재하는 키인 경우
        if (key in this.cache) {
            const node = this.cache[key]
            node.value = value
            this._moveToHead(node)
            return
        }

        // 새 노드 생성
        const newNode = new Node(key, value)
        this.cache[key] = newNode
        this._addToHead(newNode)
        this.size++

        // 용량 초과 시 가장 오래된 항목 제거
        if (this.size > this.capacity) {
            const lastNode = this._popTail()
            delete this.cache[lastNode.key]
            this.size--
        }
    }
}

module.exports = LRUCache
