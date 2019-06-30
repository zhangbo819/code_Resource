import Vue from "vue";

class Krouter {
    constructor(options = {}) {
        this.$options = options;
        this.routeMap = {};
        this.$options.routes = options.routes ? options.routes : [];

        this.app = new Vue({
            data() {
                return {
                    current: '/'
                };
            }
        })
    }

    init() {
        this.bindEvents();

        this.createRouteMap(this.$options);

        this.initComponent();
    }

    bindEvents() {
        window.addEventListener('load', this.changeCurrent.bind(this))
        window.addEventListener('hashchange', this.changeCurrent.bind(this))
    }

    changeCurrent = () => {
        this.app.current = window.location.hash.slice(1) || '/';
    }

    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component;
        });
    }

    initComponent() {
        Vue.component("router-link", {
            props: { to: String },
            render(h) {
                return h('a', { attrs: { href: '#' + this.to } }, [
                    this.$slots.default
                ])
            }
        })

        Vue.component('router-view', {
            render: h => {
                return h(this.routeMap[this.app.current])
            }
        })
    }

    addRoutes = (routes) => {
        this.$options.routes = [...this.$options.routes, ...routes];
    }
}

Krouter.install = function () {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
                console.log('init')
                this.$options.router.init();
            }
        }
    })
}


export default Krouter;