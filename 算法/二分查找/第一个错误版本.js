// https://leetcode-cn.com/problems/first-bad-version/
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */

 // 1 2 3 4 5
 // | m |    
 var solution = function(isBadVersion) {
    return function(n) {
        let low = 1
        let high = n
        let mid

        while (high - low > 1) {
            mid = low + Math.floor((high - low) / 2)
            console.log(low, high, mid)
            if (isBadVersion(mid)) {
                high = mid - 1
            } else {
                low = mid + 1
            }
        }
        // console.log(isLow)
        console.log(low, high, mid)
        // console.log(isBadVersion(low), isBadVersion(high))
        return isBadVersion(low) ? low : isBadVersion(high) ? high : high + 1
    };
};


const n = 1420736637
const bad = 1150769282

console.log('结果: ', solution(i => i >= bad)(n))