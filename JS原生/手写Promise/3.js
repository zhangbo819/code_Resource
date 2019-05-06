// 异常捕获

const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECTED = 'rejected';

function Promise(executor) {
    var self = this;
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = RESOLVE;
            self.value = value;
            self.onResolvedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }
    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejectedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }

    try {
        executor(resolve, reject);
    } catch(err) {
        reject(err)
    }
}

Promise.prototype.then = function (infulfilled, inrejected) {
    var self = this;
    if (this.status === RESOLVE) {
        infulfilled(this.value)
    }
    if (this.status === REJECTED) {
        inrejected(this.reason)
    }
    if (this.status === PENDING) {
        this.onResolvedCallbacks.push(function () {
            infulfilled(self.value)
        });
        this.onRejectedCallbacks.push(function () {
            inrejected(self.reason)
        });
    }
}

var p = new Promise(function (resolve, reject) {
    throw new Error('error - -');
})

p.then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
})