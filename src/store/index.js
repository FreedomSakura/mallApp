//1、导入模块
import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//2、安装插件
Vue.use(Vuex)

//3、创建store对象
const store = new Vuex.Store({
    state: {
        // 购物车数组
        cartList: [],
    },
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: {

    }
})

//4、导出
export default store