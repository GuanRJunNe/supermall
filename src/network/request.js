import axios from 'axios'
export function request (config) {
// 创建axios实例
  const instance = axios.create({
    baseURL:'http://123.267.32.32:8000',
    timeout: 5000
  })
// 2.1 axios请求的拦截器
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
    return Promise.reject(err)
    })
// 2.2 axios响应的拦截器
  // http response 拦截器
  instance.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      console.log(err);
    })

// 3 发送真正的网络请求
  return instance(config)
}
