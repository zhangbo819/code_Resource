// https://leetcode-cn.com/problems/search-insert-position/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let start = 0
    let end = nums.length - 1
    let mid
    while (start <= end) {
        mid = start + ((end - start) >> 1)
        console.log(start, end, mid)
        const item = nums[mid]
        if (item === target) {
            return mid
        } else if (item > target) {
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    console.log(start, end, mid)
    return start
    // return end
};

console.log(searchInsert([1, 3, 5, 6], 0))
// console.log(searchInsert([1, 3, 5, 6], 0))
// console.log(searchInsert([1, 3, 5, 6], 7))
// console.log(searchInsert([1], 1))
// console.log(searchInsert([1, 3], 3))