export class GameBoard {
  constructor(newBoard) {
    this._board = newBoard;
  }

  get board() {
    return this._board;
  }

  set board(newBoard) {
    this._board = newBoard;
  }

  isInvalidPosition(x, y) {
    return x > 7 || y > 7 || x < 0 || y < 0 || this._board[x][y] === 1;
  }

  markPosition(x, y) {
    this._board[x][y] = 1;
  }
}
