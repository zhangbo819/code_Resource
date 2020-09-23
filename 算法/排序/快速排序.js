//快速进行排序
function quicksort(arr) {
    if (arr.length <= 1) return arr;
    var leftarr = [],
        rightarr = [],
        now = arr.splice(Math.floor(arr.length / 2), 1);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= now) leftarr.push(arr[i]);
        else rightarr.push(arr[i]);
    }
    return quicksort(leftarr).concat(now, quicksort(rightarr));
}
console.log(quicksort(arr));