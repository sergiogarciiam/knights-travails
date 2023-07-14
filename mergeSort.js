function mergeSort(myArray) {
  if (myArray.length === 1) return myArray;

  const indexToSplit = myArray.length / 2;
  let firstArray = myArray.slice(0, indexToSplit);
  let secondArray = myArray.slice(indexToSplit);

  return merge(mergeSort(firstArray), mergeSort(secondArray));
}

function merge(firstArray, secondArray) {
  let newArray = [];

  while (firstArray.length !== 0 && secondArray.length !== 0) {
    if (firstArray[0] < secondArray[0]) newArray.push(firstArray.shift());
    else newArray.push(secondArray.shift());
  }

  if (firstArray.length !== 0) newArray = newArray.concat(firstArray);
  else if (secondArray.length !== 0) newArray = newArray.concat(secondArray);

  return newArray;
}

// ----- TEST ----- //
console.log(mergeSort([20, 2, 1, 8, 10, 5]));
