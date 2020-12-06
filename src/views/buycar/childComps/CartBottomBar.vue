<template>
    <div class="bottom-bar">
        <div class="check-content">
            <CheckButton class="check-button" :isChecked="isSelectAll" @click.native="SelectAll"></CheckButton>
            <span>全选</span>
        </div>

        <div class="price">
            合计：{{totalPrice}}
        </div>

        <div class="calcuate">
            去计算：{{checkLength}}
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['list']),
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        // 全选状态判断
        isSelectAll() {
            if (this.list.length == 0) return false

            for (let item of this.list) {
                if (item.isChecked == false) {
                    return false
                }
            }   
            return true
        },
    },
    methods: {
        // 点击全选
        SelectAll() {
            console.log(1231)
            // 如果已经全选了，就把全选取消掉
            if(this.list.filter(item => item.isChecked == false).length == 0) {
                for (let item of this.list) {
                    item.isChecked = false
                }
                return false
            }

            // 没有全选的话，点击后就全选
            for (let item of this.list) {
                item.isChecked = true
            }
            
            return true
        }
    }

}
</script>

<style scoped>
    .bottom-bar {
        position: fixed;
        bottom: 49px;
        left: 0;
        display: flex;

        width: 100%;
        height: 40px;
        line-height: 40px;

        background-color: #eee;
    }

    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        margin-left: 20px;
    }

    .calcuate {
        flex: 1;
        background-color: blue;

        position: relative;
        right: 0;
    }
</style>