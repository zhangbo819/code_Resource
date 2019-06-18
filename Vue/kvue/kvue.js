class KVue {
    constructor(options) {
        this.options = options;

        this.$data = options.data;

        this.observe(this.$data);
    }

    observe(value) {
        if (!(value && typeof value === 'object')) {
            return;
        }
        Object.keys(value).forEach((key) => {
            this.defineReactive(value, key, value[key]);
            this.observe(value[key])
        })
    }

    defineReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            get() {
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                console.log(`${key}更新了：${newVal}`);
            }
        })
    }
}


class Dep {

}

class Watcher {
    
}