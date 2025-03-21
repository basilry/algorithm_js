const solveNQueens = require('../../../src/problems/level3/nqueens');

describe('N-Queens 문제 테스트', () => {
  test('n=4인 경우 정확한 해답을 반환해야 함', () => {
    const result = solveNQueens(4);
    
    // 4x4 체스보드의 경우 정확히 2가지 해법이 존재
    expect(result.length).toBe(2);
    
    // 예상되는 해법들
    const expected = [
      ['.Q..', '...Q', 'Q...', '..Q.'],
      ['..Q.', 'Q...', '...Q', '.Q..']
    ];
    
    // 모든 예상 해법이 결과에 포함되어 있는지 확인
    expected.forEach(solution => {
      expect(result).toContainEqual(solution);
    });
  });
  
  test('n=1인 경우 하나의 해법만 반환해야 함', () => {
    const result = solveNQueens(1);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(['Q']);
  });
  
  test('n=0인 경우 빈 배열을 반환해야 함', () => {
    const result = solveNQueens(0);
    expect(result.length).toBe(0);
  });
  
  test('n=8인 경우 92개의 해법이 존재해야 함', () => {
    const result = solveNQueens(8);
    expect(result.length).toBe(92);
    
    // 8x8 체스보드의 첫 번째 해법 확인
    const firstSolution = result[0];
    expect(firstSolution.length).toBe(8);
    
    // 모든 해법은 유효해야 함 (각 행, 열, 대각선에 퀸이 하나만 존재)
    function isValidSolution(board) {
      const n = board.length;
      
      // 문자열 배열을 2차원 배열로 변환
      const grid = board.map(row => row.split(''));
      
      // 각 행과 열에 정확히 하나의 퀸이 있는지 확인
      for (let i = 0; i < n; i++) {
        let rowCount = 0;
        let colCount = 0;
        
        for (let j = 0; j < n; j++) {
          if (grid[i][j] === 'Q') rowCount++;
          if (grid[j][i] === 'Q') colCount++;
        }
        
        if (rowCount !== 1 || colCount !== 1) return false;
      }
      
      // 대각선 체크
      const checkDiagonal = (startRow, startCol, rowInc, colInc) => {
        let queenCount = 0;
        let row = startRow;
        let col = startCol;
        
        while (row >= 0 && row < n && col >= 0 && col < n) {
          if (grid[row][col] === 'Q') queenCount++;
          row += rowInc;
          col += colInc;
        }
        
        return queenCount <= 1;
      };
      
      // 모든 대각선 체크
      for (let i = 0; i < n; i++) {
        // 위쪽 테두리에서 시작하는 대각선
        if (!checkDiagonal(0, i, 1, 1) || !checkDiagonal(0, i, 1, -1))
          return false;
        
        // 왼쪽 테두리에서 시작하는 대각선
        if (!checkDiagonal(i, 0, 1, 1) || !checkDiagonal(i, n-1, 1, -1))
          return false;
      }
      
      return true;
    }
    
    // 첫 10개 해법이 유효한지 확인
    for (let i = 0; i < Math.min(10, result.length); i++) {
      expect(isValidSolution(result[i])).toBe(true);
    }
  });
}); 