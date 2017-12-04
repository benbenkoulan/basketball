import { createApp } from './app'

var { app, store, router } = createApp()

var G = { isClient: true }
G.size = document.documentElement.getAttribute('data-size');

if(window.__INITIAL_STATE__){
	store.replaceState(window.__INITIAL_STATE__);
}

window.G = G;

router.onReady(() => {
	console.log('--onReady------');
	router.beforeResolve((to, fr, next) => {
		console.log('--beforeResolve------');
		console.log(to);
		console.log(fr);
		const matchedComponents = router.getMatchedComponents(to);
		if(matchedComponents.length > 0){
			let matched = matchedComponents[0];
			matched.fetchData && matched.fetchData({ store, router })
		}
		next();
	});
	app.$mount('#page')
})
