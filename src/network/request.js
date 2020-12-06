// 引入网络请求模块
import axios from 'axios'

export  function request1(config){
    // 实例化axios对象
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // // 请求拦截器
    // instance.interceptors.request.use(config => {
    //     console.log('请求拦截成功')
    //     return config
    // }, err => {
    //     console.log(err)
    // })

    // // 响应拦截器
    // instance.interceptors.response.use(res => {
    //     console.log(res)
    // }, err => {
    //     console.log(err)
    // })

    return instance(config)
}

