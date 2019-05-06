// 简单的Promise

const PENDING = 'padding';
const RESOLVE = 'resolve';
const REJECTED = 'rejected';

function Promise(executor) {
    var self = this;
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = RESOLVE;
            self.value = value;
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
        }
    }

    executor(resolve, reject);
}

Promise.prototype.then = function (infulfilled, inrejected) {
    if (this.status === RESOLVE) {
        infulfilled(this.value)
    }
    if (this.status === REJECTED) {
        inrejected(this.reason)
    }
}

var p = new Promise(function (resolve, reject) {
    resolve('RESOLVE')
})

p.then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
})