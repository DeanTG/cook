import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Index from '../views/Index.vue'
import Order from '../views/Order.vue'
import Collect from '../views/Collect.vue'
import Me from '../views/Me.vue'
import Private from '../views/Private.vue'
import Banquet from '../views/Banquet.vue'
import ChefDetails from '../views/ChefDetails.vue'
import Address from '../views/Address.vue'

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
          meta: {
            title: '首页'
          },
          component: Index
        },
        {
          path: 'order',
          meta: {
            title: '订单'
          },
          component: Order
        },
        {
          path: 'collect',
          meta: {
            title: '收藏'
          },
          component: Collect
        },
        {
          path: 'me',
          meta: {
            title: '我的'
          },
          component: Me
        }
      ]
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/private',
      meta: {
        title: '私人订制'
      },
      component: Private
    },
    {
      path: '/banquet',
      meta: {
        title: '家有宴席'
      },
      component: Banquet
    },
    {
      path: '/chefDetails',
      meta: {
        title: '厨师详情'
      },
      component: ChefDetails
    },
    {
      path: '/address',
      meta: {
        title: '我的地址'
      },
      component: Address
    },
    {
      path: '*',
      redirect: '/pages/'
    }
  ]
})
