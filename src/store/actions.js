// 引入常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //1、查找购物车中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            //2、根据情况更改购物车的内容
            if (oldProduct) {   // 如果已经存在该商品，就让数量+1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1')
            } else {    // 如果存在，就向数组中添加这个商品，并设置数量为1
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新商品')
            }
        })
    }
}