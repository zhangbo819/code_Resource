let Vue;

class Store {
    constructor(options) {

        this.state = new Vue({
            data: options.state
        })

        this.$actions = options.actions;
        this.$mutations = options.mutations;
        options.getters && this.handleGetters(options.getters);
    }

    commit = (type, args) => {
        this.$mutations[type](this.state, args);
    }

    dispatch(type, args) {
        this.$actions[type]({
            commit: this.commit,
            state: this.state
        }, args);
    }

    handleGetters(getters) {
        this.getters = {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state);
                }
            })
        })
    }
}

function install(_Vue) {
    // 给了上面的Vue
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

export default { Store, install };