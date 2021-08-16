import * as components from './entry'

const install = function (Vue) {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export * from './entry'

export default {
    install
}
