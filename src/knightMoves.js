import { Knight } from "./knight.js";
import { GameBoard } from "./gameboard.js";

export class KnightMoves {
  constructor(start, end) {
    this.rootKnight = new Knight(
      start,
      new GameBoard(Array.from({ length: 8 }, () => Array(8).fill(0)))
    );
    this.targetPosition = end;
    this.path = this.getMoves();
    this.moves = this.path.length - 1;
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
