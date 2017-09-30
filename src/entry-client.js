import { createApp } from './app'

var { app, router } = createApp()

router.onReady(() => {
	router.beforeResolve((to, fr, next) => {
		const matched = router.getMatchedComponents(to);
		next();
	});
	app.$mount('#page')
})
