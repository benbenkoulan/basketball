import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import style from 'css/style'
import { createRouter } from './router'

Vue.use(Vuex)

export function createApp(){
	const router = createRouter()
	var app = new Vue({
		router,
		render: h => h(App)
	})

	return { app, router }
}