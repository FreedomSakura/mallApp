<template>
    <div id="buycar">
        <!-- 导航栏 -->
        <NavBar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </NavBar>

        <!-- 商品列表 -->
        <CartList></CartList>

        <!-- 底部工具栏 -->
        <CartBottomBar></CartBottomBar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// 滚动
import Scroll from 'components/common/scroll/Scroll'

// 引入mapGetters
import { mapGetters } from 'vuex'

export default {
    name: 'Buycar',
    components: {
        NavBar,
        CartList,
        Scroll,
        CartBottomBar
    },
    computed: {
        ...mapGetters([
            'length',
            'list'
        ])
    }
}
</script>

<style scoped>
    #buyCar {
        height: 100%;
    }
    /* .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
    } */
    
    /* .content {
        height: calc(100% - 44px - 49px);
        overflow: hidden;
    } */
</style>