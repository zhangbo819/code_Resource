class MyPromise {
    constructor(exe) {
        this.status = 'pending'
        this.value = undefined
        this.successQueue = []
        this.failureQuque = []

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'success'
                this.value = value

                while (this.successQueue.length) {
                    const cb = this.successQueue.shift()
                    cb && cb(this.value)
                }
            }
        }

        const reject = (value) => {
            if (this.status === 'pending') {
                this.status = 'failure'
                this.value = value

                while (this.failureQuque.length) {
                    const cb = this.failureQuque.shift()
                    cb && cb(this.value)
                }
            }
        }

        try {
            exe(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(success = value => value, failure = value => value) {
        return new MyPromise((resolve, reject) => {
            const successfn = (value) => {
                try {
                    const result = success(value)
                    result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
                } catch (err) {
                    failure(err)
                }
            }

            const failurefn = (value) => {
                try {
                    const result = failure(value)
                    result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
                } catch (err) {
                    failure(err)
                }
            }

            if (this.status === 'padding') {
                this.successQueue.push(successfn)
                this.failureQuque.push(failurefn)
            } else if (this.status === 'success') {
                success(this.value)
            } else {
                failure(this.value)
            }
        })
    }
}