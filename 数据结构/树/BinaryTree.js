const Stack = require('../栈/Stack');

const BinTreeNode = function (data) {
  this.data = data
  this.leftChild = null
  this.rightChild = null
  this.parentNode = null
}

// 二叉树
class BinaryTree {
  constructor(string) {
    this.root = null // 根节点
    this.init_tree(string)
  }

  // 采⽤⼴义表表示的建⽴⼆叉树⽅法
  init_tree(string) {
    const stack = new Stack()
    let key = 0
    let new_node = null

    for (let i = 0; i < string.length; i++) {
      var item = string[i]
      if (item === '(') {
        stack.push(new_node)
        key = 1
      } else if (item === ',') {
        key = 0
      } else if (item === ')') {
        stack.pop()
      } else if (item === '#') {
        break
      } else {
        new_node = new BinTreeNode(item);
        if (this.root === null) {
          this.root = new_node
        } else if (key === 1) {
          // 左子树
          const topItem = stack.top()
          topItem.leftChild = new_node
          new_node.parentNode = topItem
        } else if (key === 0) {
          // 右子树
          const topItem = stack.top()
          topItem.rightChild = new_node
          new_node.parentNode = topItem
        }
      }
    }
  }

  getRoot() {
    return this.root
  }

  // 中序遍历
  in_order(node) {
    if (node == null) {
      return
    }

    this.in_order(node.leftChild)
    console.log(node.data)
    this.in_order(node.rightChild)
  }

  // 前序遍历
  pre_order(node) {
    if (node == null) {
      return;
    }
    console.log(node.data);
    this.pre_order(node.leftChild);
    this.pre_order(node.rightChild);
  };

  // 后序遍历
  post_order(node) {
    if (node == null) {
      return;
    }
    this.post_order(node.leftChild);
    this.post_order(node.rightChild);
    console.log(node.data);
  };

  _tree_node_count(node) {
    //	左⼦树的节点数量加上右⼦树的节点数量 再加上1
    if (!node) {
      return 0;
    }
    var left_node_count = this._tree_node_count(node.leftChild);
    var right_node_count = this._tree_node_count(node.rightChild);
    return left_node_count + right_node_count + 1;
  };

  //	返回节点数量
  size() {
    return this._tree_node_count(this.root);
  };


  _tree_height(node) {
    //	左⼦树的⾼度和右⼦树的⾼度取最⼤值,加上当前的⾼度
    if (!node) {
      return 0;
    }
    var left_child_height = this._tree_height(node.leftChild);
    var right_child_height = this._tree_height(node.rightChild);
    if (left_child_height > right_child_height) {
      return left_child_height + 1;
    } else {
      return right_child_height + 1;
    }
  };
  //	返回⾼度
  height() {
    return this._tree_height(this.root);
  };


  _find_node(node, data) {
    if (!node) {
      return null;
    }
    if (node.data == data) {
      return node;
    }
    left_res = this._find_node(node.leftChild, data);
    if (left_res) {
      return left_res;
    }
    return this._find_node(node.rightChild, data);
  };
  //	查找data
  find(data) {
    return this._find_node(root, data);
  };
}



const binaryTree = new BinaryTree('A(B(D,E(G,)),C(,F))#')
const root = binaryTree.getRoot()

// console.log(binaryTree)
console.log(binaryTree.pre_order(root))