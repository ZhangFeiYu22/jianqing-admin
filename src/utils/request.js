import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '../router/index';

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
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  if (res.status == 401) {
    Message('登录已无效，请重新登录');
    setTimeout(() => {
      localStorage.removeItem('Authorization');
      router.push('/login/signin');
    }, 1500);
  } else {
    return res
  }
}, error => {
  Message({
    message: '网络连接失败',
    type: 'error'
  })
  console.log(error);
})

export default service
