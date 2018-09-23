import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const getIndexView = () => import('../views/index')
const getGamesView = () => import('../views/games')
const getFollowView = () => import('../views/follow')
const getTestView = () => import('../views/test')
const getLayoutView = () => import('../views/layout')
const getLayout2View = () => import('../views/layout2')
const getAdminView = () => import('../views/admin')
const getFollow2View = () => import('../views/follow2')
const getFlexView = () => import('../views/flex')
const get404View = () => import('../views/404')

/*const indexView = import('../views/index');
const gamesView = import('../views/games');
const followView = import('../views/follow');
const testView = import('../views/test');
const layoutView = import('../views/layout');
const layout2View = import('../views/layout2');
const adminView = import('../views/admin');
const follow2View = import('../views/follow2');
const flexView = import('../views/flex');
const _404View = import('../views/404');*/

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
		},{
			name: 'layout',
			path: '/layout',
			component: getLayoutView
		},{
			name: 'layout2',
			path: '/layout2',
			component: getLayout2View
		},{
			name: 'admin',
			path: '/admin',
			component: getAdminView
		},{
			name: 'follow2',
			path: '/follow2',
			component: getFollow2View
		},{
			name: 'flex',
			path: '/flex',
			component: getFlexView
		},{
			name: '404',
			path: '/*',
			component: get404View
		}]
	})
}