class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  isLeft() {
    return this.left !== null;
  }

  isRight() {
    return this.right !== null;
  }

  isBoth() {
    return this.isLeft() && this.isRight();
  }

  isNeither() {
    return !this.isLeft() && !this.isRight();
  }
}

class Tree {
  constructor(numbers) {
    numbers = this.deleteDuplicateValues(numbers);
    this.root = this.buildTree(numbers);
  }

  // initial build
  buildTree(numbers) {
    if (numbers.length === 0) return null;

    numbers.sort((a, b) => a - b);
    const halfIndex = Math.floor(numbers.length / 2);
    const rootNode = new Node(numbers[halfIndex]);

    const firstHalf = numbers.slice(0, halfIndex);
    const secondHalf = numbers.slice(halfIndex + 1);

    rootNode.left = this.buildTree(firstHalf);
    rootNode.right = this.buildTree(secondHalf);

    return rootNode;
  }

  // insert functions
  insert(data, node = this.root) {
    if (this.find(data) !== null) return;

    if (node.data > data) {
      this.insertLeft(data, node);
    } else {
      this.insertRight(data, node);
    }
  }

  insertLeft(data, node) {
    if (node.left !== null) {
      this.insert(data, node.left);
    } else {
      node.left = new Node(data);
    }
  }

  insertRight(data, node) {
    if (node.right !== null) {
      this.insert(data, node.right);
    } else {
      node.right = new Node(data);
    }
  }

  // delete functions
  delete(data, node = this.root, parent) {
    if (node === null) return;

    if (node.data > data && node.isLeft()) {
      this.delete(data, node.left, node);
    } else if (node.data < data && node.isRight()) {
      this.delete(data, node.right, node);
    } else if (node.data === data) {
      this.deleteNode(node, parent);
    }
  }

  deleteNode(node, parent) {
    if (node.isBoth()) {
      const replacementNode = this.getReplacementNode(node, parent);
      node.data = replacementNode.data;
    } else if (node.isLeft()) {
      this.replaceNode(node, parent, node.left);
    } else if (node.isRight()) {
      this.replaceNode(node, parent, node.right);
    } else {
      this.replaceNode(node, parent, null);
    }
  }

  getReplacementNode(node, parent) {
    let currentNode = node.right;
    while (currentNode.left !== null) {
      parent = currentNode;
      currentNode = currentNode.left;
    }
    this.deleteNode(currentNode, parent);
    return currentNode;
  }

  replaceNode(node, parent, replacement) {
    if (parent === null) {
      this.root = replacement;
    } else if (parent.left === node) {
      parent.left = replacement;
    } else {
      parent.right = replacement;
    }
  }

  // find function
  find(data, node = this.root) {
    if (node === null) return null;

    if (node.data === data) {
      return node;
    } else if (node.data > data) {
      return this.find(data, node.left);
    } else {
      return this.find(data, node.right);
    }
  }

  // traverser functions
  levelOrder(cb = null) {
    let currentNode = this.root;
    let resultArray = [];
    let queue = [currentNode];

    while (queue.length !== 0) {
      currentNode = queue.shift();

      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);

      if (cb !== null) cb(currentNode);
      else resultArray.push(currentNode.data);
    }

    return cb === null ? resultArray : null;
  }

  inOrder(cb = null) {
    if (cb === null) return this.inOrderGetArray();
    else this.inOrderCallback(cb);
  }

  inOrderGetArray(currentNode = this.root, resultArray = []) {
    if (currentNode === null) return resultArray;

    resultArray = this.inOrderGetArray(currentNode.left, resultArray);
    resultArray.push(currentNode.data);
    resultArray = this.inOrderGetArray(currentNode.right, resultArray);

    return resultArray;
  }

  inOrderCallback(cb, currentNode = this.root) {
    if (currentNode === null) return;

    this.inOrderCallback(cb, currentNode.left);
    cb(currentNode);
    this.inOrderCallback(cb, currentNode.right);
  }

  preOrder(cb = null) {
    let currentNode = this.root;
    let resultArray = [];
    let stack = [currentNode];

    while (stack.length !== 0) {
      currentNode = stack.pop();

      if (currentNode.right !== null) stack.push(currentNode.right);
      if (currentNode.left !== null) stack.push(currentNode.left);

      if (cb !== null) cb(currentNode);
      else resultArray.push(currentNode.data);
    }

    return cb === null ? resultArray : null;
  }

  postOrder(cb = null) {
    if (cb === null) return this.postOrderGetArray();
    else this.postOrderCallback(cb);
  }

  postOrderGetArray(currentNode = this.root, resultArray = []) {
    if (currentNode === null) return resultArray;

    resultArray = this.postOrderGetArray(currentNode.left, resultArray);
    resultArray = this.postOrderGetArray(currentNode.right, resultArray);
    resultArray.push(currentNode.data);

    return resultArray;
  }

  postOrderCallback(cb, currentNode = this.root) {
    if (currentNode === null) return;

    this.postOrderCallback(cb, currentNode.left);
    this.postOrderCallback(cb, currentNode.right);
    cb(currentNode);
  }

  // heigh functions
  heigh(data) {
    const node = this.find(data);
    return this.heighHelp(node);
  }

  heighHelp(node, cont = 0, max = 0) {
    if (node === null) return max - 1;

    cont += 1;
    max = this.heighHelp(node.left, cont, max);
    max = this.heighHelp(node.right, cont, max);

    return cont >= max ? cont : max;
  }

  // depth functions
  depth(data) {
    const node = this.find(data);
    return this.depthHelp(node);
  }

  depthHelp(target, currentNode = this.root, cont = 0) {
    if (currentNode === null) return cont - 1;
    if (target === currentNode) return cont;

    cont += 1;
    let newCont = this.depthHelp(target, currentNode.right, cont);
    if (cont !== newCont) cont = this.depthHelp(target, currentNode.left, cont);

    return cont;
  }

  // util functions
  deleteDuplicateValues(numbers) {
    return numbers.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  // top function to visualize the tree
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
myTree.prettyPrint();
console.log(myTree.heigh(8));
