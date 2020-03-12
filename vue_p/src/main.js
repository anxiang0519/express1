// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
let myVue = new Vue({
	el: '#app',
	data:{
		title:''
	},
	router,
	store,
	components: { App },
	template: '<App/>'
})
