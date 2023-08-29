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

  insert(key, root = this.root) {
    if (root === null) {
      const root = new Node(key);
      return root;
    }

    if (key < root.data) {
      root.left = this.insert(key, root.left);
    } else if (key > root.data) {
      root.right = this.insert(key, root.right);
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

  delete(key, root = this.root) {
    if (root === null) {
      return root;
    }

    if (key < root.data) {
      root.left = this.delete(key, root.left);
    } else if (key > root.data) {
      root.right = this.delete(key, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        let temp = root;
        temp = this.minFinder(root.right, key);
        root.data = temp.data;

        root.right = this.delete(temp.data, root.right);

        return root;
      }
    }

    return root;
  }

  find(key, root = this.root) {
    if (root === null) return "not found";

    if (key === root.data) return root;

    if (key < root.data) {
      root = this.find(key, root.left);
    } else if (key > root.data) {
      root = this.find(key, root.right);
    }

    return root;
  }

  levelOrder(func, root = this.root) {
    const queue = [];
    const arr = [];
    queue.push(root);

    //start arr with root
    // while the queue has more than 1 item repeat the algo
    //if the root has children, push those children into the queue
    //dequeue the front
    //if an item is null, return null

    while (queue.length > 0) {
      const temp = queue.shift();

      if (temp.left !== null) {
        queue.push(temp.left);
      }

      if (temp.right !== null) {
        queue.push(temp.right);
      }

      if (func === undefined) {
        arr.push(temp.data);
      } else {
        arr.push(func(temp.data));
      }
    }

    return arr;
  }

  inorder(func, root = this.root, arr = []) {
    if (root === null) return;

    this.inorder(func, root.left, arr);

    if (func === undefined) {
      arr.push(root.data);
    } else {
      arr.push(func(root.data));
    }
    this.inorder(func, root.right, arr);

    return arr;
  }

  preorder(func, root = this.root, arr = []) {
    if (root === null) return;

    if (func === undefined) {
      arr.push(root.data);
    } else {
      arr.push(func(root.data));
    }

    this.preorder(func, root.left, arr);
    this.preorder(func, root.right, arr);

    return arr;
  }

  postorder(func, root = this.root, arr = []) {
    if (root === null) return;

    this.postorder(func, root.left, arr);
    this.postorder(func, root.right, arr);

    if (func === undefined) {
      arr.push(root.data);
    } else {
      arr.push(func(root.data));
    }

    return arr;
  }

  height(node = this.root) {
    if (node === null) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, counter = 0) {
    if (root === null) return counter;

    if (node.data === root.data) return counter;

    if (node.data < root.data) return this.depth(node, root.left, counter + 1);

    if (node.data > root.data) return this.depth(node, root.right, counter + 1);

    return counter;
  }

  isBalanced(root = this.root) {
    let balanced;
    if (root === null) return balanced;
    const leftHeight = this.height(root.left) + 1;
    const rightHeight = this.height(root.right) + 1;

    if (Math.abs(leftHeight - rightHeight) <= 1) {
      balanced = "balanced";
    } else {
      balanced = "unbalanced";
    }
    console.log(leftHeight);
    console.log(rightHeight);

    return balanced;
  }

  rebalance() {
    this.root = this.buildTree(this.inorder());

    return this.root;
  }
}

const randomArr = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 100) + 1
);

const driverScript = (arr) => {
  const tree = new Tree(arr);
  console.log(tree.isBalanced());
  console.log(tree.inorder());
  console.log(tree.preorder());
  console.log(tree.postorder());

  tree.insert(120);
  tree.insert(122345);
  tree.insert(1111);
  tree.insert(432);

  console.log(tree.isBalanced());
  tree.rebalance();

  console.log(tree.isBalanced());
  console.log(tree.inorder());
  console.log(tree.preorder());
  console.log(tree.postorder());
};

driverScript(randomArr);
