var arr = [];
//随机20个数
function getArr() {
    while (arr.length < 20) {
        var b = true;
        var rand = parseInt(Math.random() * 100 + 1);
        if (arr.length == 0) {
            arr.push(rand);
        }
        for (var i = 0; i < arr.length; i++) {
            if (rand == arr[i]) {
                b = false;
            }
        }
        if (b) {
            arr.push(rand);
        }
    }
    return arr;
}
var arr = getArr();
console.log(arr);