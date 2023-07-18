import { KnightController } from "./src/knightController.js";

let myKnight = KnightController.knightMoves([0, 0], [3, 3]);

console.log(
  `=> You made it in ${myKnight.length - 1} moves!  Here's your path:`
);

for (let index = 0; index < myKnight.length; index++) {
  console.log(myKnight[index]);
}
