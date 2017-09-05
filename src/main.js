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


//axios配置
//配置请求拦截器
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})
//配置响应拦截器
axios.interceptors.response.use((res) => {
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

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
