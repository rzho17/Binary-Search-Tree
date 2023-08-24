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

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 68];
// const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
      const root = new Node(key);
      return root;
    }

    if (key < root.data) {
      root.left = this.insert(root.left, key);
    } else if (key > root.data) {
      root.right = this.insert(root.right, key);
    }

    return root;
  }

  minFinder(root, key) {
    if (root === null) {
      return root;
    }

    if (root.left !== null) {
      root = this.minFinder(root.left, key);
      return root;
    }

    return root;
  }

  delete(root, key) {
    if (root === null) {
      return root;
    }

    // this.minFinder(root.right, key);

    if (key < root.data) {
      root.left = this.delete(root.left, key);
    } else if (key > root.data) {
      root.right = this.delete(root.right, key);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        let temp = root;
        temp = this.minFinder(root.right, key);
        root.data = temp.data;

        root.right = this.delete(root.right, temp.data);

        return root;
      }
    }

    return root;
  }

  find(key, root = this.root) {
    if (root === null) {
      return "not found";
    }
    if (key === root.data) {
      // console.log(root);
      return root;
    }

    if (key < root.data) {
      root = this.find(key, root.left);
    } else if (key > root.data) {
      root = this.find(key, root.right);
    }

    // console.log(root.data);
    return root;
  }
}

const t = new Tree(test);

prettyPrint(t.root);

// console.log(t.find(67));
// prettyPrint(t.delete(t.root, 67));
// t.find(67);
// t.delete(t.root, 6);
// prettyPrint(t.delete(t.root, 9));

// t.minFinder(t.root, 9);
// prettyPrint(t.insert(t.root, 0));
// prettyPrint(t.insert(t.root, 100));
// prettyPrint(t.delete(t.root, 6345));
