/* 请求模块 */

// 引入 axios
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基地址
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // 请求发起会经过这里
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意 ： 这里务必要返回 config 配置对象，否则请求就停在这里
    // console.log(config)
    return config
  },
  function (error) {
    // 如果请求出错了 (还没有发出去) 会进入这里
    // Do something with request error
    return Promise.reject(error)
  }
)

// 相应拦截器

export default request
