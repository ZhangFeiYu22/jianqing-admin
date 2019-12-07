import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '../router/index';
import {
  getToken,
  removeToken,
  getSite,
  removeSite,
} from '@/utils/auth'

// 实例化 axios
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(config => {
  var xtoken = getToken();
  var siteID = '1';
  if (config.method == 'post') {
    config.data = {
      access_token: xtoken,
      site_id: siteID,
      ...config.data
    }
  } else if (config.method == 'get') {
    config.params = {
      access_token: xtoken,
      site_id: siteID,
      ...config.params
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  if (res.data.code == 2) {
    Message('登录已无效，请重新登录');
    setTimeout(() => {
      removeToken();
      removeSite();
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
