var a = [[1, 2, 3, 4], [5, 6, 8], [[[7]]]];
var b = [[{ a: 1 }, 2, 3, 4], [5, 6, 8], [[{ b: 2 }, [7]]]];

// to do export
// export default function myFlat(arr) {
function myFlat(arr) {
    // 1 全数字数组
    // return arr.toString().split(',')

    // 2.1 单层
    // return [].concat.apply([],arr);

    // 2.2 多层
    var hasFlat = new Array().flat;

    while (arr.some(item => Array.isArray(item))) {
        if (hasFlat) {
            // flat()
            arr = arr.flat();
        } else {
            // apply
            arr = [].concat.apply([], arr);
            // ...
            // arr = [].concat(...arr);
        }
    }
    return arr
}

// console.log(myflat(a))
// console.log(myflat(b))
