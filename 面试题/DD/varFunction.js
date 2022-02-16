var a = 'a';
function a() {
    console.log('fn in')
}

a();

// VM614:1 Uncaught SyntaxError: Identifier 'a' has already been declared
// at <anonymous>:1:1

// 声明提前 变量永远在函数前面