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
            } else if (this.isTnterpolation(node)) {
                // 插值
                console.log(RegExp.$1)
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })

    }

    isElement(node) {
        return node.nodeType === 1;
    }

    isTnterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
}