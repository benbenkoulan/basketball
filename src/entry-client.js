import { createApp, createLoading } from './app'

var { app, store, router } = createApp()

var loading = createLoading()
document.body.appendChild(loading.$el)

var G = { client: true }
G.size = document.documentElement.getAttribute('data-size');

if(window.__INITIAL_STATE__){
	store.replaceState(window.__INITIAL_STATE__);
}

window.G = G;

router.onReady(() => {
	router.beforeResolve((to, fr, next) => {
		console.log('--beforeResolve------');
		const matchedComponents = router.getMatchedComponents(to);
		if(matchedComponents.length){
			loading.start();
			Promise.all(matchedComponents.map(matched => {
				return matched.fetchData && matched.fetchData({ store, router })
			})).then(() => {
				loading.stop();
			})
		}
		next();
	});
	app.$mount('#page');
})

router.onError((err) => {
	console.log('-------error--------');
	alert(err);
})