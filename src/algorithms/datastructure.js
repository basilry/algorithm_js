/**
 * 스택을 구현한 클래스
 */
class Stack {
    constructor() {
        this.items = []
    }

    push(item) {
        this.items.push(item)
    }

    pop() {
        if (this.isEmpty()) return null
        return this.items.pop()
    }

    peek() {
        if (this.isEmpty()) return null
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }
}

/**
 * 큐를 구현한 클래스
 */
class Queue {
    constructor() {
        this.items = []
    }

    enqueue(item) {
        this.items.push(item)
    }

    dequeue() {
        if (this.isEmpty()) return null
        return this.items.shift()
    }

    front() {
        if (this.isEmpty()) return null
        return this.items[0]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }
}

/**
 * 해시맵을 구현한 클래스
 */
class HashMap {
    constructor() {
        this.map = {}
    }

    set(key, value) {
        this.map[key] = value
    }

    get(key) {
        return this.map[key]
    }

    has(key) {
        return key in this.map
    }

    delete(key) {
        if (this.has(key)) {
            delete this.map[key]
            return true
        }
        return false
    }

    size() {
        return Object.keys(this.map).length
    }
}

module.exports = {
    Stack,
    Queue,
    HashMap,
}
