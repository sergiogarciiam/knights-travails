import { KnightMoves } from "./src/knightMoves.js";

let myKnight = new KnightMoves([3, 3], [4, 3]); // [x, y] // init, end

console.log(`=> You made it in ${myKnight.moves} moves!  Here's your path:`);

for (let index = 0; index < myKnight.path.length; index++) {
  console.log(myKnight.path[index]);
}
