import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import index from '@/components/index'
import usermanage from '@/components/usermanage/usermanage'
import product from '@/components/product/product'
import shopcar from '@/components/shopcar/shopcar'
import order from '@/components/order/order'


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
            path: '/home/usermanage',
            name: 'usermanage',
            component: usermanage
          },
          {
            path: '/home/product',
            name: 'product',
            component: product
          },
          {
            path: '/home/shopcar',
            name: 'shopcar',
            component: shopcar
          },
          {
            path: '/home/order',
            name: 'order',
            component: order
          }
      ]
    }
  ],
  mode:'history'
})
