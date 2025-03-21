const {
  TreeNode,
  preorderTraversal,
  inorderTraversal,
  postorderTraversal,
  preorderTraversalIterative,
  inorderTraversalIterative,
  postorderTraversalIterative,
  arrayToTree
} = require('../../../src/problems/level3/treeTraversal');

describe('트리 순회 문제 테스트', () => {
  // 테스트에 사용할 트리 생성
  //      1
  //     / \
  //    2   3
  //   / \
  //  4   5
  let root;
  
  beforeEach(() => {
    const node1 = new TreeNode(1);
    const node2 = new TreeNode(2);
    const node3 = new TreeNode(3);
    const node4 = new TreeNode(4);
    const node5 = new TreeNode(5);
    
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.right = node5;
    
    root = node1;
  });
  
  describe('트리 구성 함수 테스트', () => {
    test('arrayToTree 함수 테스트', () => {
      const arr = [1, 2, 3, 4, 5, null, null];
      const tree = arrayToTree(arr);
      
      expect(tree.val).toBe(1);
      expect(tree.left.val).toBe(2);
      expect(tree.right.val).toBe(3);
      expect(tree.left.left.val).toBe(4);
      expect(tree.left.right.val).toBe(5);
      expect(tree.right.left).toBeNull();
      expect(tree.right.right).toBeNull();
    });
  });
  
  describe('재귀 구현 테스트', () => {
    test('preorderTraversal 함수 테스트', () => {
      const result = preorderTraversal(root);
      expect(result).toEqual([1, 2, 4, 5, 3]); // 전위: 루트 -> 왼쪽 -> 오른쪽
    });
    
    test('inorderTraversal 함수 테스트', () => {
      const result = inorderTraversal(root);
      expect(result).toEqual([4, 2, 5, 1, 3]); // 중위: 왼쪽 -> 루트 -> 오른쪽
    });
    
    test('postorderTraversal 함수 테스트', () => {
      const result = postorderTraversal(root);
      expect(result).toEqual([4, 5, 2, 3, 1]); // 후위: 왼쪽 -> 오른쪽 -> 루트
    });
  });
  
  describe('반복 구현 테스트', () => {
    test('preorderTraversalIterative 함수 테스트', () => {
      const result = preorderTraversalIterative(root);
      expect(result).toEqual([1, 2, 4, 5, 3]); // 전위: 루트 -> 왼쪽 -> 오른쪽
    });
    
    test('inorderTraversalIterative 함수 테스트', () => {
      const result = inorderTraversalIterative(root);
      expect(result).toEqual([4, 2, 5, 1, 3]); // 중위: 왼쪽 -> 루트 -> 오른쪽
    });
    
    test('postorderTraversalIterative 함수 테스트', () => {
      const result = postorderTraversalIterative(root);
      expect(result).toEqual([4, 5, 2, 3, 1]); // 후위: 왼쪽 -> 오른쪽 -> 루트
    });
  });
  
  describe('재귀와 반복 구현의 결과 일치 테스트', () => {
    test('전위 순회 결과 일치 테스트', () => {
      const recursive = preorderTraversal(root);
      const iterative = preorderTraversalIterative(root);
      expect(recursive).toEqual(iterative);
    });
    
    test('중위 순회 결과 일치 테스트', () => {
      const recursive = inorderTraversal(root);
      const iterative = inorderTraversalIterative(root);
      expect(recursive).toEqual(iterative);
    });
    
    test('후위 순회 결과 일치 테스트', () => {
      const recursive = postorderTraversal(root);
      const iterative = postorderTraversalIterative(root);
      expect(recursive).toEqual(iterative);
    });
  });
  
  describe('특수 케이스 테스트', () => {
    test('빈 트리의 경우 빈 배열을 반환해야 함', () => {
      expect(preorderTraversal(null)).toEqual([]);
      expect(inorderTraversal(null)).toEqual([]);
      expect(postorderTraversal(null)).toEqual([]);
      expect(preorderTraversalIterative(null)).toEqual([]);
      expect(inorderTraversalIterative(null)).toEqual([]);
      expect(postorderTraversalIterative(null)).toEqual([]);
    });
    
    test('단일 노드 트리의 경우 해당 값만 포함하는 배열을 반환해야 함', () => {
      const singleNode = new TreeNode(42);
      expect(preorderTraversal(singleNode)).toEqual([42]);
      expect(inorderTraversal(singleNode)).toEqual([42]);
      expect(postorderTraversal(singleNode)).toEqual([42]);
      expect(preorderTraversalIterative(singleNode)).toEqual([42]);
      expect(inorderTraversalIterative(singleNode)).toEqual([42]);
      expect(postorderTraversalIterative(singleNode)).toEqual([42]);
    });
  });
}); 