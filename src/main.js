// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios/'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css'
import filters from './filters'
import store from './store/'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(MintUI)

// 中央事件总线
Vue.prototype.BUS = new Vue()

Vue.prototype.$http = axios //其他页面在使用axios的时候直接  this.$http就可以了

Vue.config.productionTip = false

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