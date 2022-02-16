// 节点
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// 单向链表
class LinkList {
  length = 0
  head = null // 头部元素
  tail = null // 尾部元素

  // 添加一个新元素到尾部
  append(data) {
    var node = new Node()

    // 空链表
    if (this.head == null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length += 1
    return true
  }


  // 打印整个链表
  print() {
    var curr_node = this.head;
    var str_link = ""
    while (curr_node) {
      str_link += curr_node.data.toString() + "	->";
      curr_node = curr_node.next;
    }
    str_link += "null";
    console.log(str_link);
    console.log("⻓度为" + this.length.toString());
  }



  // 在指定位置插入一个元素
  insert(index = 0, data = '') {
    if (index === this.length) {
      return this.append(data)
    } else if (index > this.length || index < 0) {
      return false;
    } else {
      var node = new Node()
      if (index == 0) {
        //	如果在头节点前⾯插⼊,新的节点就变成了头节点
        node.next = this.head
        this.head = node
      } else {
        //	要插⼊的位置是index,找到索引为index-1的节点,然后进⾏连接
        var pre_node = get_node(index)
        node.next = pre_node.next
        pre_node.next = node
      }
      this.length += 1
      return true
    }
  }

  //	删除指定位置的节点
  remove(index) {
    //	参数不合法
    if (index < 0 || index >= length) {
      return null;
    }

    var del_node = null
    //	删除的是头节点
    if (index == 0) {
      del_node = this.head
      this.head = this.head.next
      // 之前仅有一个节点
      if (!this.head) {
        this.tail = null
      }
    } else {
      //	找到索引为index-1的节点
      var pre_node = get_node(index - 1);
      del_node = pre_node.next;
      pre_node.next = pre_node.next.next;
      //	如果删除的是尾节点
      if (del_node.next == null) {
        this.tail = pre_node;
      }
    }

    this.length -= 1
    del_node.next = null
    return del_node.data
  }

  //	返回指定位置节点的值
  get(index) {
    var node = get_node(index);
    if (node) {
      return node.data;
    }
    return null;
  }

  //	返回指定元素的索引,如果没有,返回-1
  //	有多个相同元素,返回第⼀个
  indexOf(data) {
    var index = -1
    var curr_node = this.head

    while (curr_node) {
      index += 1
      if (curr_node.data === data) {
        return index
      } else {
        curr_node = curr_node.next
      }
    }
    return -1
  }

  //	删除尾节点
  remove_tail() {
    return this.remove(this.length - 1);
  };
  //	删除头节点
  remove_head() {
    return this.remove(0);
  };

  //	返回链表头节点的值
  head() {
    return this.get(0);
  }
  //	返回链表尾节点的值
  tail() {
    return this.get(this.length - 1);
  }

  // isEmpty
  isEmpty() {
    return this.length == 0;
  };

  //	清空链表
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  };
}

// 获取指定位置的节点
function get_node(index = 0) {
  if (index < 0 || index >= length) return null
  let curr_node = this.head
  // let node_index = index
  while (index-- > 0) {
    curr_node = curr_node.next
  }
  return curr_node
}

exports.LinkList	=	LinkList;