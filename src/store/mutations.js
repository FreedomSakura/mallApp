// 引入常量
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'


export default {
    [ADD_COUNTER](state, oldProduct) {
        oldProduct.count++
        console.log('oldProduct', oldProduct)
    },
    [ADD_TO_CART](state, product) {
        
        state.cartList.push(product)
        console.log('product', product)
    }
}