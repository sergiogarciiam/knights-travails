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

  isOne() {
    return this.isLeft ^ !this.isRight;
  }

  isBoth() {
    return this.isLeft() && this.isRight();
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
  delete(data, node = this.root) {
    if (node.data > data && node.isLeft()) {
      this.delete(data, node.left);
    } else if (node.data < data && node.isRight()) {
      this.delete(data, node.right);
    } else if (node.data === data) {
      this.deleteHelp(node);
    } else {
      return null;
    }
  }

  deleteHelp(node) {
    if (!node.isBoth()) {
    } else if (node.isOne()) {
    } else if (node.isBoth()) {
    }
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
