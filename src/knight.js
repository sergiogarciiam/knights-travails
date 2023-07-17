export class Knight {
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
