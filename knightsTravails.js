class GameBoard {
  constructor(newBoard) {
    this._board = newBoard;
  }

  get board() {
    return this._board;
  }

  set board(newBoard) {
    this._board = newBoard;
  }
}

class Knight {
  constructor(
    position,
    newBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  ) {
    // [x, y]
    this.gameBoard = new GameBoard(newBoard);
    this.position = position;
    this.nextKnights = [];

    const x = this.position[0];
    const y = this.position[1];

    if (this.isRightPosition(x, y)) return null;
    this.gameBoard.board[x][y] = 1;
  }

  // UP
  moveUpLeft() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] + 2;
    const y = this.position[1] - 1;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  moveUpRight() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] + 2;
    const y = this.position[1] + 1;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  // DOWN
  moveDownLeft() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] - 2;
    const y = this.position[1] - 1;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  moveDownRight() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] - 2;
    const y = this.position[1] + 1;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  // Right
  moveLeftUp() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] + 1;
    const y = this.position[1] - 2;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  moveLeftDown() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] - 1;
    const y = this.position[1] - 2;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  // RIGHT
  moveRightUp() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] + 1;
    const y = this.position[1] + 2;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  moveRightDown() {
    this.gameBoard.board[this.position[0]][this.position[1]] = 1;

    const x = this.position[0] - 1;
    const y = this.position[1] + 2;

    if (this.isRightPosition(x, y)) return null;

    const newPosition = [x, y];
    this.gameBoard.board[x][y] = 1;
    this.nextKnights.push(new Knight(newPosition, this.gameBoard.board));
    this.gameBoard.board[x][y] = 0;
  }

  isRightPosition(x, y) {
    return x > 7 || y > 7 || x < 0 || y < 0 || this.gameBoard.board[x][y] === 1;
  }
}

class MovementTree {
  constructor(initial) {
    this.rootKnight = new Knight(initial);
    this.buildMovementsTree(this.rootKnight);
  }

  buildMovementsTree(knight) {
    knight.moveUpLeft();
    knight.moveUpRight();
    knight.moveDownLeft();
    knight.moveDownRight();
    knight.moveLeftUp();
    knight.moveLeftDown();
    knight.moveRightUp();
    knight.moveRightDown();

    knight.nextKnights.forEach((nextKnight) => {
      this.buildMovementsTree(nextKnight);
    });
  }

  getElements() {
    let stack = [this.rootKnight];
    let currentKnight = null;

    while (stack.length !== 0) {
      currentKnight = stack.pop();
      console.log(currentKnight.position);

      currentKnight.nextKnights.forEach((nextKnight) => {
        stack.push(nextKnight);
      });
    }
  }
}

let myKnight = new MovementTree([3, 3]);
myKnight.getElements();
