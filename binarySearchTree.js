let array = [132, 213, 543, 32, 55, 90, 200, 10, 34, 91, 88, 188];
array = array.sort((a, b) => {
  return a - b;
});

function tree(array) {
  let mainRoot = buildTree(array);
  array = array.sort((a, b) => {
    return a - b;
  });

  function buildTree(array) {
    array = array.sort((a, b) => {
      return a - b;
    });
    let data = node();
    if (array.length <= 2) {
      data.value = array[0];
      if (array.length === 2) {
        data.right = node();
        data.right.value = array[1];
      }
      return data;
    }
    if (array.length === 3) {
      data.left = node();
      data.left.value = array[0];
      data.value = array[1];
      data.right = node();
      data.right.value = array[2];
      return data;
    }
    let leftSide = array.slice(0, Math.floor(array.length / 2));
    let rightSide = array.slice(Math.floor(array.length / 2) + 1);
    data.value = array[Math.floor(array.length / 2)];
    data.left = buildTree(leftSide);
    data.right = buildTree(rightSide);
    if (array.length > 2) {
      root = array[array.length / 2];
    }
    return data;
  }

  function insert(value) {
    let currentNode = mainRoot;
    while (
      (currentNode.left !== null && currentNode.value > value) ||
      (currentNode.right !== null && currentNode.value < value)
    ) {
      if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (currentNode.value > value) {
      currentNode.left = node();
      currentNode.left.value = value;
    } else {
      currentNode.right = node();
      currentNode.right.value = value;
    }
  }

  function deleteItems(value) {
    let currentNode = mainRoot;
    let tempNode;
    while (
      currentNode.right !== null ||
      currentNode.left !== null ||
      currentNode.value === value
    ) {
      if (currentNode.value === value) {
        break;
      }
      if (currentNode.value < value) {
        tempNode = currentNode;
        currentNode = currentNode.right;
      } else {
        tempNode = currentNode;
        currentNode = currentNode.left;
      }
    }
    if (currentNode.value !== value) {
      console.log("value not found");
      return;
    }
    if (currentNode.right === null && currentNode.left === null) {
      if (tempNode.value > value) {
        tempNode.left = null;
      } else {
        tempNode.right = null;
      }
    } else if (currentNode.right !== null && currentNode.left !== null) {
      let tempNode = currentNode;
      tempNode = tempNode.right;
      let tempNode2 = tempNode;
      if (currentNode.right.left !== null) {
        while (tempNode.left !== null) {
          tempNode2 = tempNode;
          tempNode = tempNode.left;
        }
        currentNode.value = tempNode.value;
        tempNode2.left = null;
      } else if (currentNode.right.right !== null) {
        currentNode.value = currentNode.right.value;
        currentNode.right = currentNode.right.right;
      } else {
        currentNode.value = currentNode.right.value;
        currentNode.right = null;
      }
    } else {
      currentNode.value = currentNode.left.value;
      currentNode.right = currentNode.left.right;
      currentNode.left = currentNode.left.left;
    }
  }

  function find(value) {
    let currentNode = mainRoot;
    while (
      currentNode.right !== null ||
      currentNode.left !== null ||
      currentNode.value === value
    ) {
      if (currentNode.value === value) {
        break;
      }
      if (currentNode.value < value) {
        tempNode = currentNode;
        currentNode = currentNode.right;
      } else {
        tempNode = currentNode;
        currentNode = currentNode.left;
      }
    }
    if (currentNode.value !== value) {
      console.log("value not found");
      return;
    } else {
      return currentNode;
    }
  }

  function levelOrder(callback) {
    let tree = mainRoot;
    let queue = [tree];
    let values = [];
    while (queue) {
      if (queue.length === 0) {
        break;
      }
      if (callback) {
        callback(queue[0].value);
      } else {
        values.push(queue[0].value);
      }

      if (queue[0].left) {
        queue.push(queue[0].left);
      }
      if (queue[0].right) {
        queue.push(queue[0].right);
      }
      queue.splice(0, 1);
    }

    return callback ? null : values;
  }

  function inOrder(callback) {
    let values = [];
    function setValues(node) {
      if (!node) {
        return;
      }
      setValues(node.left);
      values.push(node.value);
      setValues(node.right);
    }
    setValues(mainRoot);
    return values;
  }

  function preOrder(callback) {
    let values = [];
    function setValues(node) {
      if (!node) {
        return;
      }
      values.push(node.value);
      setValues(node.left);
      setValues(node.right);
    }
    setValues(mainRoot);
    return values;
  }

  function postOrder(callback) {
    let values = [];
    function setValues(node) {
      if (!node) {
        return;
      }
      setValues(node.left);
      setValues(node.right);
      values.push(node.value);
    }
    setValues(mainRoot);
    return values;
  }

  function height(node) {
    if (!node && !mainRoot) {
      return;
    }

    let height = 0;
    function getHeight(node, value) {
      if (!node) {
        if (height < value) {
          height = value;
        }
        return;
      }
      getHeight(node.right, value + 1);
      getHeight(node.left, value + 1);
    }
    if (node) {
      getHeight(node, 0);
    } else {
      return 0;
    }
    return height - 1;
  }

  function depth(node) {
    let finalDept = 0;
    function traverse(value, depth) {
      if (!value) {
        return;
      }
      if (value === node) {
        finalDept = depth;
        return;
      }
      traverse(value.left, depth + 1);
      traverse(value.right, depth + 1);
    }
    traverse(mainRoot, 0);
    return finalDept;
  }

  function isBalanced() {
    let isBalanced = true;
    function traverse(node) {
      if (!node) {
        return;
      }
      if (
        height(node.left) - height(node.right) > 1 ||
        height(node.left) - height(node.right) < -1
      ) {
        isBalanced = false;
      }
      traverse(node.left);
      traverse(node.right);
    }
    traverse(mainRoot);
    return isBalanced;
  }

  function rebalance() {
    if (!isBalanced()) {
      let values = inOrder();
      mainRoot = buildTree(values);
    }
  }

  function node() {
    return { value: null, left: null, right: null };
  }

  function printBST(root, prefix = "", isLeft = true) {
    if (root === null) {
      return;
    }

    if (root.right !== null) {
      printBST(root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.value}`);

    if (root.left !== null) {
      printBST(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function getTree() {
    return mainRoot;
  }
  return {
    insert,
    printBST,
    getTree,
    deleteItems,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

let tree1 = new tree(array);
tree1.insert(120);
tree1.rebalance();
tree1.printBST(tree1.getTree());
