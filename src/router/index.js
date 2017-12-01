import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const getIndexView = () => import('../views/index')
const getGamesView = () => import('../views/games')
const getFollowView = () => import('../views/follow')
const getTestView = () => import('../views/test')

export default function createRouter(){
	return new VueRouter({
		mode: 'history',
		routes: [{
			path: '/',
			redirect: 'index'
		},{
			name: 'index',
			path: '/index',
			component: getIndexView
		},{
			name: 'test',
			path: '/test',
			component: getTestView
		},{
			name: 'games',
			path: '/games',
			component: getGamesView
		},{
			name: 'follow',
			path: '/follow',
			component: getFollowView
		}]
	})
}