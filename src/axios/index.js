import axios from 'axios'
import qs from 'qs'
import router from '../router/'
import store from '../store/'
import config from '../config/'

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
axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.params = {
  accessToken: '',
  version: '110',
  deviceType: '3',
}

export default axios