import { Knight } from "./knight.js";
import { GameBoard } from "./gameboard.js";

export const KnightController = (() => {
  let rootKnight = null;
  let targetPosition = null;

  const knightMoves = (start, end) => {
    rootKnight = new Knight(
      start,
      new GameBoard(Array.from({ length: 8 }, () => Array(8).fill(0)))
    );
    targetPosition = end;
    return getMoves();
  };

  function getMoves() {
    let queue = [rootKnight];
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

      if (isTarget(currentKnight)) {
        foundTarget = true;
        break;
      }

      for (const [dx, dy] of moves) {
        const newKnight = currentKnight.move(dx, dy);
        if (newKnight !== null) queue.push(newKnight);
      }
    }

    if (foundTarget) {
      return getPath(currentKnight);
    } else {
      return null;
    }
  }

  function getPath(target) {
    let currentKnight = target;
    let positionsArray = [];

    while (currentKnight !== null) {
      positionsArray.push(currentKnight.position);
      currentKnight = currentKnight.father;
    }

    return positionsArray.reverse();
  }

  function isTarget(currentKnight) {
    return (
      currentKnight.position[0] === targetPosition[0] &&
      currentKnight.position[1] === targetPosition[1]
    );
  }

  return { knightMoves };
})();
