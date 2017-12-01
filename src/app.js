import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import style from 'css/style'

import createStore from './store'
import createRouter from './router'

Vue.use(Vuex)

export function createApp(){
	const store = createStore()
	const router = createRouter()

	const app = new Vue({
		store,
		router,
		render: h => h(App)
	})

	return { app, store, router }
}