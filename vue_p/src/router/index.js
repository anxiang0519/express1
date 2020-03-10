import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import index from '@/components/index'
import userManage from '@/components/userManage/userManage'
import product from '@/components/product/product'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
          {
            path: '/home/index',
            name: 'index',
            component: index
          },
          {
            path: '/home/userManage',
            name: 'userManage',
            component: userManage
          },
          {
            path: '/home/product',
            name: 'product',
            component: product
          }
      ]
    }
  ],
  mode:'history'
})
