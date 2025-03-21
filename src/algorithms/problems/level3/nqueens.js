/**
 * N-Queens 문제 (완전탐색 - 레벨 3)
 * NxN 체스보드에 N개의 퀸을 서로 공격할 수 없게 배치하는 방법 찾기
 * 
 * @param {number} n - 체스보드 크기와 퀸의 수
 * @returns {string[][]} - 모든 유효한 퀸 배치를 담은 배열
 */
function solveNQueens(n) {
  // n이 0인 경우 빈 배열 반환
  if (n === 0) {
    return [];
  }
  
  const result = [];
  
  // 체스보드 초기화 (모든 칸이 '.'인 NxN 보드)
  const initBoard = () => Array(n).fill().map(() => Array(n).fill('.'));
  
  // 현재 위치에 퀸을 놓을 수 있는지 확인
  function isValid(board, row, col) {
    // 같은 열에 퀸이 있는지 확인
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false;
      }
    }
    
    // 왼쪽 위 대각선에 퀸이 있는지 확인
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    
    // 오른쪽 위 대각선에 퀸이 있는지 확인
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    
    return true;
  }
  
  // 보드를 문자열 배열로 변환
  function boardToStrings(board) {
    return board.map(row => row.join(''));
  }
  
  // 백트래킹으로 퀸 배치하기
  function backtrack(board, row) {
    // 모든 행에 퀸을 배치했으면 결과에 추가
    if (row === n) {
      result.push(boardToStrings(board));
      return;
    }
    
    // 현재 행의 각 열에 퀸을 놓아보기
    for (let col = 0; col < n; col++) {
      // 현재 위치에 퀸을 놓을 수 있는지 확인
      if (isValid(board, row, col)) {
        // 퀸 배치
        board[row][col] = 'Q';
        
        // 다음 행으로 재귀 호출
        backtrack(board, row + 1);
        
        // 백트래킹 (퀸 제거)
        board[row][col] = '.';
      }
    }
  }
  
  // 백트래킹 시작
  const board = initBoard();
  backtrack(board, 0);
  
  return result;
}

module.exports = solveNQueens; 