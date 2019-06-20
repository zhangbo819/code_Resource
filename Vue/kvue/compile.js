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

        while (child = el.lastChild) {
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
                console.log('编译元素', node.nodeName)
            } else if (this.isTnterpolation(node)) {
                // 插值
                this.compileText(node)
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })

    }

    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, 'text');
    }

    update(node, vm, exp, dir) {
        const updateFn = this[dir + 'Updater'];

        updateFn && updateFn(node, vm.$data[exp]);

        new Watcher(vm, exp, function (value) {
            updateFn && updateFn(node, value);
        });
        // console.log("vm.$data[exp]", vm.$data[exp], exp)
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    isElement(node) {
        return node.nodeType === 1;
    }

    isTnterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
}