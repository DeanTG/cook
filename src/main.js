// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css'
import filters from './filters'
import store from './store/'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(MintUI)

Vue.config.productionTip = false

// 中央事件总线
Vue.prototype.BUS = new Vue()

//axios配置
//配置请求拦截器
axios.interceptors.request.use((config) => {
  store.dispatch('showLoading')
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  router.beforeEach((to, from, next) => {
    if (to.path.indexOf('login') == -1) {
      if (!localStorage.getItem('userId')) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
  return config;
}, (error) => {
  return Promise.reject(error);
})
//配置响应拦截器
axios.interceptors.response.use((res) => {
  store.dispatch('hideLoading')  
  if (res.data.statusCode != '00000') {
    alert('请求错误')
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
})
/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
;*/
axios.defaults.baseURL = 'http://tyapi.znzkj.net/wzs-api/s/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.params = {
  accessToken: '',
  version: '110',
  deviceType: '3',
}
Vue.prototype.$http = axios //其他页面在使用axios的时候直接  this.$http就可以了

// 路由配置
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
