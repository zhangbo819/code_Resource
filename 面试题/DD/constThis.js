const a = 'a';
// var a = 'a';
const b = {
    a: 'aa',
    // fn() { console.log("this.a", this.a) },
    fn: () => { console.log("this.a", this.a) }
    // fn: this,
};

b.fn();
const c = b.fn;
c();

// console.log("Window === this", Window === this)
// console.log("this instanceof Window", this instanceof Window)


// Window是构造函数 this是他的实例
// 不管用 var 还是 const 定义的属性都不在Window中 而在全局的this中