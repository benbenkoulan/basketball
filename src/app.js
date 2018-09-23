import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import createStore from './store'
import createRouter from './router'

Vue.use(Vuex)

export function createApp(){
	const store = createStore()
	const router = createRouter()

	const app = new Vue({
		store,
		router,
		render: h => h(App)//h是vm.$createElement，在vm._render阶段执行
	})

	return { app, store, router }
}

import style from 'css/style'
import loading from 'com/loading'

export function createLoading(){
	 return new Vue(loading).$mount()
}
