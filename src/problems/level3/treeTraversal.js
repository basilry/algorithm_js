/**
 * 트리 순회 문제 (자료구조 활용 - 레벨 3)
 * 이진 트리의 전위(preorder), 중위(inorder), 후위(postorder) 순회 구현
 */

// 이진 트리 노드 클래스
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

/**
 * 재귀를 사용한 전위 순회 (root -> left -> right)
 *
 * @param {TreeNode} root - 이진 트리의 루트 노드
 * @returns {number[]} - 전위 순회 결과 배열
 */
function preorderTraversal(root) {
    const result = []

    function dfs(node) {
        if (!node) return

        // 현재 노드 방문 (루트)
        result.push(node.val)

        // 왼쪽 서브트리 순회
        dfs(node.left)

        // 오른쪽 서브트리 순회
        dfs(node.right)
    }

    dfs(root)
    return result
}

/**
 * 재귀를 사용한 중위 순회 (left -> root -> right)
 *
 * @param {TreeNode} root - 이진 트리의 루트 노드
 * @returns {number[]} - 중위 순회 결과 배열
 */
function inorderTraversal(root) {
    const result = []

    function dfs(node) {
        if (!node) return

        // 왼쪽 서브트리 순회
        dfs(node.left)

        // 현재 노드 방문 (루트)
        result.push(node.val)

        // 오른쪽 서브트리 순회
        dfs(node.right)
    }

    dfs(root)
    return result
}

/**
 * 재귀를 사용한 후위 순회 (left -> right -> root)
 *
 * @param {TreeNode} root - 이진 트리의 루트 노드
 * @returns {number[]} - 후위 순회 결과 배열
 */
function postorderTraversal(root) {
    const result = []

    function dfs(node) {
        if (!node) return

        // 왼쪽 서브트리 순회
        dfs(node.left)

        // 오른쪽 서브트리 순회
        dfs(node.right)

        // 현재 노드 방문 (루트)
        result.push(node.val)
    }

    dfs(root)
    return result
}

/**
 * 스택을 사용한 반복적 전위 순회
 *
 * @param {TreeNode} root - 이진 트리의 루트 노드
 * @returns {number[]} - 전위 순회 결과 배열
 */
function preorderTraversalIterative(root) {
    if (!root) return []

    const result = []
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.pop()

        // 현재 노드 방문
        result.push(node.val)

        // 스택은 LIFO이므로 오른쪽 노드를 먼저 스택에 넣음
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
    }

    return result
}

/**
 * 스택을 사용한 반복적 중위 순회
 *
 * @param {TreeNode} root - 이진 트리의 루트 노드
 * @returns {number[]} - 중위 순회 결과 배열
 */
function inorderTraversalIterative(root) {
    const result = []
    const stack = []
    let current = root

    while (current || stack.length > 0) {
        // 왼쪽 끝까지 이동하며 모든 노드를 스택에 푸시
        while (current) {
            stack.push(current)
            current = current.left
        }

        // 스택에서 노드를 꺼내고 방문
        current = stack.pop()
        result.push(current.val)

        // 오른쪽 서브트리로 이동
        current = current.right
    }

    return result
}

/**
 * 스택을 사용한 반복적 후위 순회
 *
 * @param {TreeNode} root - 이진 트리의 루트 노드
 * @returns {number[]} - 후위 순회 결과 배열
 */
function postorderTraversalIterative(root) {
    if (!root) return []

    const result = []
    const stack = [root]
    const visited = new Set()

    while (stack.length > 0) {
        const node = stack[stack.length - 1] // 스택의 맨 위 노드 확인

        // 리프 노드이거나 자식 노드를 이미 방문한 경우
        if (
            (!node.left && !node.right) ||
            (node.left && visited.has(node.left) && node.right && visited.has(node.right)) ||
            (node.left && visited.has(node.left) && !node.right) ||
            (!node.left && node.right && visited.has(node.right))
        ) {
            result.push(node.val)
            visited.add(node)
            stack.pop()
        } else {
            // 오른쪽 자식이 있고 아직 방문하지 않았으면 스택에 푸시
            if (node.right && !visited.has(node.right)) {
                stack.push(node.right)
            }

            // 왼쪽 자식이 있고 아직 방문하지 않았으면 스택에 푸시
            if (node.left && !visited.has(node.left)) {
                stack.push(node.left)
            }
        }
    }

    return result
}

/**
 * 문자열로 표현된 트리를 TreeNode 객체로 구성
 *
 * @param {(number|null)[]} arr - 트리를 레벨 순서로 표현한 배열
 * @returns {TreeNode|null} - 구성된 트리의 루트 노드
 */
function arrayToTree(arr) {
    if (!arr || arr.length === 0) return null

    const root = new TreeNode(arr[0])
    const queue = [root]
    let i = 1

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift()

        // 왼쪽 자식
        if (arr[i] !== null && arr[i] !== undefined) {
            node.left = new TreeNode(arr[i])
            queue.push(node.left)
        }
        i++

        // 오른쪽 자식
        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
            node.right = new TreeNode(arr[i])
            queue.push(node.right)
        }
        i++
    }

    return root
}

module.exports = {
    TreeNode,
    preorderTraversal,
    inorderTraversal,
    postorderTraversal,
    preorderTraversalIterative,
    inorderTraversalIterative,
    postorderTraversalIterative,
    arrayToTree,
}
