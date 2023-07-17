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

  isInvalidPosition(x, y) {
    return x > 7 || y > 7 || x < 0 || y < 0 || this._board[x][y] === 1;
  }

  markPosition(x, y) {
    this._board[x][y] = 1;
  }
}

class Knight {
  constructor(position, gameBoard, father = null) {
    this.gameBoard = gameBoard;
    this.position = position;
    this.father = father;
    this.gameBoard.markPosition(position[0], position[1]);
  }

  move(dx, dy) {
    const x = this.position[0] + dx;
    const y = this.position[1] + dy;

    if (this.gameBoard.isInvalidPosition(x, y)) return null;
    return new Knight([x, y], this.gameBoard, this);
  }
}

class KnightMoves {
  constructor(initial, target) {
    this.rootKnight = new Knight(
      initial,
      new GameBoard(Array.from({ length: 8 }, () => Array(8).fill(0)))
    );
    this.targetPosition = target;
    this.path = this.getMoves();
  }

  getMoves() {
    let queue = [this.rootKnight];
    let currentKnight = null;
    let foundTarget = false;
    const moves = [
      [2, -1],
      [2, 1],
      [-2, -1],
      [-2, 1],
      [1, -2],
      [-1, -2],
      [1, 2],
      [-1, 2],
    ];

    while (queue.length !== 0) {
      currentKnight = queue.shift();

      if (this.isTarget(currentKnight)) {
        foundTarget = true;
        break;
      }

      for (const [dx, dy] of moves) {
        const newKnight = currentKnight.move(dx, dy);
        if (newKnight !== null) queue.push(newKnight);
      }
    }

    if (foundTarget) {
      return this.getPath(currentKnight);
    } else {
      return null;
    }
  }

  getPath(target) {
    let currentKnight = target;
    let positionsArray = [];

    while (currentKnight !== null) {
      positionsArray.push(currentKnight.position);
      currentKnight = currentKnight.father;
    }

    return positionsArray.reverse();
  }

  isTarget(currentKnight) {
    return (
      currentKnight.position[0] === this.targetPosition[0] &&
      currentKnight.position[1] === this.targetPosition[1]
    );
  }
}

// ----- TEST ----- //
let myKnight = new KnightMoves([3, 3], [4, 3]);

console.log(
  `=> You made it in ${myKnight.path.length - 1} moves!  Here's your path:`
);

for (let index = myKnight.path.length - 1; index >= 0; index--) {
  console.log(myKnight.path[index]);
}
