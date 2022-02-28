// 用bit原理做的map，可以添加一个数字，和 判断一个数字是否存在
class BitMap {
  constructor(size) {
    this.bit_arr = new Array(size).fill(0)
  }
  addMember(member) {
    var arr_index = Math.floor(member / 32)                            // 决定数组中的索引
    var bit_index = member % 32                                        // 决定在整数的32个bit位的哪一位
    this.bit_arr[arr_index] = this.bit_arr[arr_index] | 1 << bit_index
  }

  isExist(member) {
    var arr_index = Math.floor(member / 32)                            // 决定数组中的索引
    var bit_index = member % 32                                        // 决定在整数的32个bit位的哪一位

    const value =  this.bit_arr[arr_index] & 1 << bit_index

    return value != 0
    
    // 传入 12
    // 1000 0000 0000
    // 已有 1010 0101 0110
    // 1010 0101 0110
    // 按位与后 发现 第一位都是1，则代表有结果，表示已经存在
  }
}
