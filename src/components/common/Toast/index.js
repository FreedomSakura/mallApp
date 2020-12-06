//1、引入组件
import Toast from './Toast'

//2、创建一个对象（插件）
const obj = {}

//3、写插件的install方法
obj.install = function(Vue) {
    //（1）创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    //（2）创建插件对象
    const toast = new toastContrustor()

    //（3）将组件对象手动挂载到一个Dom上
    toast.$mount(document.createElement('div'))
    console.log(toast)
    //（4）将toast挂载的div推入body
    document.body.appendChild(toast.$el)

    //（5）在Vue的原型中设置这个对象
    Vue.prototype.$toast = toast
}

export default obj