import Vue from 'vue'
import Router from 'vue-router'
import queryAll from '@/components/queryAll'
import editUser from '@/components/editUser'
import addUser from '@/components/addUser'
import login from '@/components/login'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: queryAll
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/editUser',
      name: 'editUser',
      component: editUser
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: addUser
    }
  ],
  mode:'history'
})
