import Vue from 'vue'
import App from './App.vue'
import style from 'css/style'
import { createRouter } from './router'

export function createApp(){
	const router = createRouter()
	var app = new Vue({
		router,
		render: h => h(App)
	})

	return { app, router }
}