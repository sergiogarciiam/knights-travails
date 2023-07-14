function fibs(n) {
  let fib = [];

  for (let index = 0; index < n; index++) {
    if (index === 0) fib.push(0);
    else if (index === 1) fib.push(1);
    else fib.push(fib[index - 2] + fib[index - 1]);
  }

  return fib;
}

function fibsRec(n) {
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const sequence = fibsRec(n - 1);
  sequence.push(sequence[n - 2] + sequence[n - 3]);
  return sequence;
}

// ----- TEST ----- //
console.log(fibs(8));
console.log(fibsRec(8));
