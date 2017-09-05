import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Index from '../views/Index.vue'
import Order from '../views/Order.vue'
import Collect from '../views/Collect.vue'
import Me from '../views/Me.vue'
import Explanation from '../views/Explanation.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/pages/'
    },
    {
      path: '/pages',
      component: Main,
      children: [{
          path: '',
          redirect: '/pages/index'
        },
        {
          path: 'index',
          component: Index
        },
        {
          path: 'order',
          component: Order
        },
        {
          path: 'collect',
          component: Collect
        },
        {
          path: 'me',
          component: Me
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/explanation',
      component: Explanation
    },
    {
      path: '*',
      redirect: '/pages/'
    }
  ]
})
