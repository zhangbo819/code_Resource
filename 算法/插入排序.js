function insertSort(arr) {
    var result = [];
    result.push(arr[0]);
    for (var i = 1, len = arr.length; i < len; i++) {
        var el = arr[i];
        if (result[i - 1] > el) {
            for (var j = 0; j < i; j++) {
                if (result[j] > el) {
                    result.splice(j, 0, el);
                    break;
                }
            }
        } else {
            result.push(el);
        }
    }
    return result;
}
console.log(insertSort(getArr(arr)))