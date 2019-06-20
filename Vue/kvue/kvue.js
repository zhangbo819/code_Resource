class KVue {
    constructor(options) {
        this.options = options;

        this.$data = options.data;

        this.observe(this.$data);

        // new Watcher();
        // this.$data.name;
        // new Watcher();
        // this.$data.msg.age;

        this.Compile = new Compile(options.el, this);

        if (options.created) {
            options.created.call(this);
        }
    }

    observe(value) {
        if (!(value && typeof value === 'object')) {
            return;
        }
        Object.keys(value).forEach((key) => {
            this.defineReactive(value, key, value[key]);

        })
    }

    defineReactive(obj, key, val) {
        this.observe(val);

        let dep = new Dep();

        Object.defineProperty(obj, key, {
            get() {
                // console.log(`${key} get in ${Dep.target}`);
                Dep.target && dep.addDep(Dep.target)
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // console.log(`${key}更新了：${newVal}`);
                dep.notify();
            }
        })
    }
}


class Dep {
    constructor() {
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.$vm = vm;
        this.$key = key;
        this.$cb = cb;

        Dep.target = this;
        this.$vm.$data[key];
        Dep.target = null;
    }

    update() {
        // console.log('属性改变了!')

        this.$cb.call(this.$vm, this.$vm.$data[this.$key])
    }
}