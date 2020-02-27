import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import index from '@/components/index'
import queryAll from '@/components/user/queryAll'


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
            path: '/home/user',
            name: 'userlist',
            component: queryAll
          }
      ]
    }
  ],
  mode:'history'
})
