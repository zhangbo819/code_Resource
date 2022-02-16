// 不知道链表多长，一次循环，找到中间的节点

// 节点
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

// 返回倒数第k个节点的值
function find_middle(head) {
  var fast = head;
  var slow = head;
  //	两个⼀起⾛,fast⼀次⾛两步,slow⼀次⾛⼀步
  while (fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.data;
};

console.log(find_middle(node1));