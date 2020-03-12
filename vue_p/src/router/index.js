import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import index from '@/components/index/index'
import usermanage from '@/components/usermanage/usermanage'
import product from '@/components/product/product'
import shopcar from '@/components/shopcar/shopcar'
import order from '@/components/order/order'
import setting from '@/components/setting/setting'


Vue.use(Router)


const router = new Router({
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
    meta:{requireAuth:true},
    children:[
    {
      path: '/home/index',
      name: 'index',
      component: index,
      meta:{requireAuth:true}
    },
    {
      path: '/home/usermanage',
      name: 'usermanage',
      component: usermanage,
      meta:{requireAuth:true}
    },
    {
      path: '/home/product',
      name: 'product',
      component: product,
      meta:{requireAuth:true}
    },
    {
      path: '/home/shopcar',
      name: 'shopcar',
      component: shopcar,
      meta:{requireAuth:true}
    },
    {
      path: '/home/order',
      name: 'order',
      component: order,
      meta:{requireAuth:true}
    },
    {
      path: '/home/setting',
      name: 'setting',
      component: setting,
      meta:{requireAuth:true}
    }
    ]
  }
  ],
  mode:'history'
})
router.beforeEach((to,from,next)=>{
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if(router.app.$store.state.token){ //判断本地是否存在access_token
      next();
    }else {
      next({
        path:'/login'
      })
    }
  }
  else {
    next();
  }
})

export default router
