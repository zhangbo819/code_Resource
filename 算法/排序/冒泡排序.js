// var arr = [20, 3, 50, 41, 99, 33, 45, 21, 1, 37];
function fn(arr) {
	var index = 0;
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] > arr[j]) {
				arr[i] ^= arr[j];
				arr[j] ^= arr[i];
				arr[i] ^= arr[j];

				// index = arr[i];
				// arr[i] = arr[j];
				// arr[j] = index;
			}
		}
	}
	return arr
}

// console.log(arr);
console.log(fn(arr));