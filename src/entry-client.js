import { createApp } from './app'

var { app, router } = createApp()

var G = { isClient: true }
G.size = document.documentElement.getAttribute('data-size');

window.G = G;

router.onReady(() => {
	router.beforeResolve((to, fr, next) => {
		const matched = router.getMatchedComponents(to);
		next();
	});
	app.$mount('#page')
})
