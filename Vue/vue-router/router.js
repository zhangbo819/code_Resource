class VueRouter {
    constructor(option) {

        this.$option = option
        this.routerMap = {}

        this.app = new Vue({
            data: {
                current: '/'
            }
        })

        this.init()
    }

    init() {
        this.bindEvents()
        this.createRouterMap(this.$option)
        this.initComponent()
    }

    bindEvents() {
        window.addEventListener('load', this.onHashChange.bind(this));
        window.addEventListener('hashchange', this.onHashChange.bind(this));
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRouterMap(options) {
        options.routes.forEach(item => {
            this.routerMap[item.path] = item.component;
        })
    }
    initComponent() {
        // router-link, router-view
        Vue.component('router-link', {
            props: { to: String },
            render (h) {
                return h('a', { attrs: { href: "#" + this.to } }, [this.$slots.default])
            }
        })
        Vue.component('router-view', {
            render: (h) => {
                const comp = this.routerMap[this.app.current]
                return h(comp)
            }
        })
    }
}

VueRouter.install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$option && this.$option.router) {
                Vue.prototype.$router = this.$option.router;
                this.$option.router.init()
            }
        }
    })
}

Vue.use(VueRouter)