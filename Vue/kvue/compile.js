class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;

        if (this.$el) {
            // 取出真实节上的内容
            this.$fragment = this.node2Fragment(this.$el);
            // 编译
            this.compile(this.$fragment);
            // console.log(b)
            // 将编译后的结果添加回去
            this.$el.appendChild(this.$fragment);
        }
    }

    node2Fragment(el) {
        const flag = document.createDocumentFragment();
        let child;

        while (child = el.firstChild) {
            flag.appendChild(child)
        }

        return flag;
    }

    compile(el) {
        // console.log(a.children);
        const { childNodes } = el;

        Array.from(childNodes).forEach(node => {

            if (this.isElement(node)) {
                // 元素
                // console.log('编译元素')
                Array.from(node.attributes).map(i => {
                    const { name, value } = i;
                    let dir = '';
                    if (this.isDir(name)) {
                        dir = name.slice(2);
                        
                        this[dir] && this[dir](this.$vm, node, value);
                    } else if (this.isEvent(name)) {
                        dir = name.slice(1);
                        
                        this.eventHandler(this.$vm, node, value, dir);
                    }
                })
            } else if (this.isTnterpolation(node)) {
                // 插值
                this.compileText(node)
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })

    }

    text(vm, node, value) {
        this.update(node, vm, value, 'text');
    }

    html(vm, node, value) {
        this.update(node, vm, value, 'html');
    }

    model(vm, node, exp) {
        this.update(node, vm, exp, 'model');

        node.addEventListener('input', (e) => {
            vm[exp] = e.target.value;
        })
    }

    eventHandler(vm, node, exp, dir) {
        const fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm))
        }
    }

    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, 'text');
    }

    update(node, vm, exp, dir) {
        const updateFn = this[dir + 'Updater'];

        console.log('getDeepValue in', vm)
        const value = getDeepValue(vm.$data, exp);

        updateFn && updateFn(node, value);

        new Watcher(vm, exp, function (value) {
            updateFn && updateFn(node, value);
        });
        // console.log("vm.$data[exp]", vm.$data[exp], exp)

        function getDeepValue(obj, key) {
            if (!key.includes('.')) {
                return obj[key];
            }
            
            return key.split('.').reduce((r, k) => {
                if (typeof r === 'object') {
                    r = r[k];
                }
                return r
            }, obj)
        }
    }

    htmlUpdater(node, value) {
        node.innerHTML = value;
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    modelUpdater(node, value) {
        node.value = value;
    }

    isDir(name) {
        return name.indexOf('k-') === 0;
    }

    isEvent(name) {
        return name.indexOf('@') === 0;
    }

    isElement(node) {
        return node.nodeType === 1;
    }

    isTnterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    getDeepValue(obj, exp) {
        if (!exp.includes('.')) {
            return obj[exp];
        }

        return exp.split('.').reduce((r, i) => {
            if (typeof r === 'object') {
                r = r[i];
            }
            return r;
        }, obj)
    }
}