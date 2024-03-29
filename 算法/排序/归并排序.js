// var arr = [19, 94, 11, 33, 41, 64, 20, 76, 63, 51, 77, 3, 100, 42, 35, 46, 50, 58, 61, 69];
// document.write(arr + "<br/>");

function mergeSort(arr) {

	if (arr.length == 1) { return arr };
	var mid = Math.floor(arr.length / 2);
	var left_arr = arr.slice(0, mid),
		right_arr = arr.slice(mid);
	return merge(mergeSort(left_arr), mergeSort(right_arr));
	
	function merge(left, right) {
		var result = [];
		while (left.length > 0 && right.length > 0) {
			if (left[0] < right[0]) {
				result.push(left.shift());
			}
			else {
				result.push(right.shift());
			}
		}
		/* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
		return result.concat(left, right);
	}
}

console.log(mergeSort(arr))

// document.write(mergeSort(arr));