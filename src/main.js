// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconLink/iconfont.css' // 引入图标
import common from './utils/common' // 图片上传共用方法
import ThirdMenu from './components/ThirdMenu.vue' // 全局组件

Vue.config.productionTip = false;
Vue.prototype.commonJs = common;
Vue.use(ElementUI);
Vue.component('ThirdMenu', ThirdMenu);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
