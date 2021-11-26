class KVue {
    constructor(options) {
        this.$options = options;

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
            this.proxyData(key)
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

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
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
        this.$vm[key];
        Dep.target = null;
    }

    update() {
        // console.log('属性改变了!')

        this.$cb.call(this.$vm, this.$vm[this.$key])
    }
}


/** 
 * 处理数据，数据变的时候 执行回调 更新视图
 * new Vue() -> Observer -> 多个 defineReactive$$1 -> 多个 Dep -> get depend -> addDep -> 放置回调
 *                                                            -> set notify -> update -> 执行回调
 * 
 * 
 * 根据dom 生成多个 Watcher， Watcher中注册好更新视图的回调, 触发Dep的get 放置好回调
 * Compile -> update -> 注册多个 Watcher 的回调 -> 改变Dep.taget -> 触发get/addDep/放置回调
 * 
 * 
 * 一个Vue对象，他的data对应一个Observer对象，Observer会遍历再通过defineReactive$$1，每条属性都注册一个Dep，如果还有子属性递归地为所有子元素注册Dep
 * (并且设置setter/getter, getter放置回调, setter执行回调)
 * 
 * 全局有无数个Dep实例，所有的Dep实例受Dep类下的target来控制注册，不管哪个Dep实例depend了，只有target下的才会去放置回调，
 * target是一个Watcher实例，target由pushTarget方法设置，pushTarget在Watcher实例执行get方法的时候会将自己设置为Dep.target, 触发getting方法，然后在将Dep.target移除，一个Watcher下有多个Dep
 * 
 * ?? Dep和Watcher的关系
*/ 