import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		//存儲token
		token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
	},
	mutations:{
		 // 修改token，并将token存入localStorage
		changeLogin(state,user){
			state.Authorization = user.token;
			localStorage.setItem('token',user.token);
		}
	}
})

export default store