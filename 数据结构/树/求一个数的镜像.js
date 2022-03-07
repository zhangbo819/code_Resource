//  对于一棵树，如果每个节点的左右子树互换位置，那么就变成了这颗树的镜像
// 请实现 mirror 方法
const BinaryTree = require('./BinaryTree')

var bt = new BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

var mirror = function (node) {
  //	在这⾥实现你的⽅法
};

mirror(root_node);
bt.in_order(root_node);

// 结果应该是
// F	C	A	E	G		B	D