<template>
        <div class="cart-list">
            <Scroll class="wrapper" ref="scroll">
                <CartItem v-for="(item, index) in list" :key="index" 
                :product="item" ></CartItem>  
            </Scroll>
        </div>
</template>

<script>
// 滚动
import Scroll from 'components/common/scroll/Scroll'

// 辅助函数
import { mapGetters } from 'vuex'

// 子组件
import CartItem from './CartItem'


export default {
    name: 'CartList',
    components: {
        Scroll,
        CartItem,
},
    computed: {
        ...mapGetters([
            'list'
        ])
    },
    activated() {
        console.log('------')
        this.$refs.scroll.refresh()
    },
    
}
</script>

<style scoped>
    .cart-list {
        height: 100vh;
    }
    .wrapper {
        height: calc(100% - 44px - 49px);
        overflow: hidden;
    }
</style>