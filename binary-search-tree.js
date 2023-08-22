const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const removeDuplicate = (arr) => {
  const tempArr = arr.filter((data, index) => arr.indexOf(data) === index);

  return tempArr;
};

const sortArray = (arr) => removeDuplicate(arr).sort((a, b) => a - b);

// const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log(sortArray(test));

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(root) {
    this.root = this.buildTree(root);
  }

  buildTree(arr) {
    const sorted = sortArray(arr);
    const start = 0;
    const end = sorted.length - 1;

    if (start > end) return null;

    const mid = Math.floor((0 + sorted.length - 1) / 2);

    const node = new Node(sorted[mid]);

    const left = sorted.slice(0, mid);
    const right = sorted.slice(mid + 1, sorted.length);

    node.left = this.buildTree(left);

    node.right = this.buildTree(right);

    return node;
  }

  insert(root, key) {
    if (root === null) {
      const node = new Node(key);
      return node;
    }

    if (key < root.data) {
      root.left = this.insert(root.left, key);
      // console.log("yo");
    } else if (key > root.data) {
      root.right = this.insert(root.right, key);
    }

    return root;
  }
}

const t = new Tree(test);

prettyPrint(t.root);

// prettyPrint(t.insert(t.root, 0));
// prettyPrint(t.insert(t.root, 100));
// console.log(t.root);
// prettyPrint(t.root);
