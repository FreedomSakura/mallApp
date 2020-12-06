//import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.prototype.$bus = new Vue({})
// 安装插件
import Toast from 'components/common/Toast'
Vue.use(Toast)
// 路由懒加载
import vueLazyLoad from 'vue-lazyload'
Vue.use(vueLazyLoad)

// fastclick
import fastClick from 'fastclick'
// 使用fastclick
fastClick.attach(document.body)

//createApp(App).mount('#app')
const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
