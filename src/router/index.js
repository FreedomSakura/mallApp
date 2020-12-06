// 引入模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 安装插件
Vue.use(VueRouter)

// 导入插件
const Home = () => import('views/home/home') 
const Category = () => import('views/category/category') 
const Buycar = () => import('views/buycar/buycar') 
const Mine = () => import('views/mine/mine') 
const Detail = () => import('views/detail/detail')

// 路由关系
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/buycar',
        component: Buycar
    },
    {
        path: '/mine',
        component: Mine
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]

// 配置路由
const router = new VueRouter({
    routes,
    mode: 'history'
})

// 导出配置
export default router