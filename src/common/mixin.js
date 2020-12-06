// 防抖
import {debounce} from './utils'

export const itemListenerMixin = {
    data() {
        return {
            // 要监听的函数
            itemImgListener: null
        }
    },
    mounted() {
        //1、防抖
        let newRefresh = debounce(this.$refs.scroll.refresh, 500)

        //2、保存要监听的函数
        this.itemImgListener = () => {
            newRefresh()
        }

        //3、监听事件
        this.$bus.$on('imgLoadout', this.itemImgListener)
    },
}

export const backTop = {
    data() {
        return {
            isBackTop: false
        }
    },
    methods: {
        /*
        *   返回顶部
         */
        backTop() {
            this.$refs.scroll.scrollTo(0, 0)
        },
    }
}