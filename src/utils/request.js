import axios from 'axios'
import {
  Message,Loading
} from 'element-ui'
import router from '../router/index';

// let loading        //定义loading变量
// function startLoading() {    //使用Element loading-start 方法
//   loading = Loading.service({
//       lock: true,
//       text: '加载中……',
//       background: 'rgba(0, 0, 0, 0.7)'
//   })
// }
// function endLoading() {    //使用Element loading-close 方法
//   loading.close()
// }
// //那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// //声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// //调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
// let needLoadingRequestCount = 0
// export function showFullScreenLoading() {
//     if (needLoadingRequestCount === 0) {
//         startLoading()
//     }
//     needLoadingRequestCount++
// }

// export function tryHideFullScreenLoading() {
//     if (needLoadingRequestCount <= 0) return
//     needLoadingRequestCount--
//     if (needLoadingRequestCount === 0) {
//         endLoading()
//     }
// }

// 实例化 axios
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    'content-type': 'application/json; charset=UTF-8'
    // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (localStorage.getItem('api_token')) {
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('api_token')}` // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers['Authorization'] = localStorage.getItem('Authorization') // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (config.method == 'post') {
    config.data = {
      ...config.data
    }
  } else if (config.method == 'get') {
    config.params = {
      ...config.params
    }
  }
  // showFullScreenLoading()
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  console.log('22--',res)
  if (res.status == 401) {
    Message('登录已无效，请重新登录');
    setTimeout(() => {
      localStorage.removeItem('Authorization');
      router.push('/login/signin');
    }, 1500);
  } else {
    // tryHideFullScreenLoading()
    return res
  }
}, error => {
  Message({
    message: '网络连接失败',
    type: 'error'
  });
  console.log(error);
})

export default service
