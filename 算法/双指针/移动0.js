// esay https://leetcode-cn.com/problems/move-zeroes/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 笨方法
//  var moveZeroes = function(nums) {
//     let left = 0
//     let right = nums.length - 1

//     while (left < right) {
//         if (nums[left] === 0) {
//             nums.splice(left, 1)
//             nums.push(0)
//             // left ++
//             right --
//         } else {
//             left ++
//         }

//         if (nums[right] === 0) {
//             right --
//         }
//     }

//     return nums
// };

// 输入: [0, 1, 0, 3, 12]
// 输出: [1, 3, 12, 0, 0]

// 双指针 将左指针非0 和 右指针交换
// 左指针始终是 非0队列最后一个的后一个，也就是0队列里第一个0
// 右指针遍历全部的数组，找到所有非0数字 和左指针交换
var moveZeroes = function (nums) {
    let left = 0
    let right = 0
    let len = nums.length

    while (right < len) {
        if (nums[right]) {
            var temp = nums[left]
            nums[left] = nums[right]
            nums[right] = temp
            left++
        }
        right++
    }

    return nums
};

// 输入: [1, 3, 12, 0, 13, 0, 14]
// 输出: [1, 3, 12, 0, 0, 13, 14]
// 优化 
//     1. 左右指针直接从第一个0开始 （避免初始时，左右指针在非0队列里交换）
//     2. 因为(第一条),所以左指针一定是0，所以仅用右覆盖左，右固定用0来补充
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
    let zeroIndex = nums.findIndex(i => i === 0)
    let len = nums.length
    let left = zeroIndex === -1 ? len : zeroIndex
    let right = left
    

    while (right < len) {
        if (nums[right]) {
            // var temp = nums[left]
            nums[left] = nums[right]
            nums[right] = 0
            left++
        }
        right++
    }

    return nums
};