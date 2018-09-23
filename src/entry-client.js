import { createApp, createLoading } from './app'

const { app, store, router } = createApp()

const loading = createLoading()
document.body.appendChild(loading.$el)

const G = window.G || (window.G = Object.create(null));
G.client = true;
G.loading = loading;

if(window.__INITIAL_STATE__){
	const initialState = window.__INITIAL_STATE__;
	const storeState = initialState.store || {};
	const fetchState = initialState.fetch;
	store.replaceState(storeState);
	//Object.assign(app, fetchState);
}

router.onReady(() => {
	router.beforeResolve((to, fr, next) => {
		const matchedComponents = router.getMatchedComponents(to);
		if(matchedComponents.length){
			loading.start();
			const fetchDataPromises = [];
			matchedComponents.forEach(matchedComponent => {
				if (matchedComponent.fetchData) fetchDataPromises.push(matchedComponent.fetchData({ store, router }));
			});
			Promise.all(fetchDataPromises).then((states) => {
				loading.stop();
			})
			.catch(() => {
				loading.stop();	
			});
		}
		next();
	});
	app.$mount('#page');
});

router.onError((err) => {
	console.log('-------error--------');
	//alert(err);
	throw err;
})