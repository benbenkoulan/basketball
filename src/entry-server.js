import { createApp } from './app'

var G = {};
global.G = G;

export default context => {
	return new Promise((resolve, reject) => {
		const { app, store, router } = createApp()
		router.push({ path: context.url })
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			const fetchDataPromises = [];
			matchedComponents.forEach(matchedComponent => {
				if (matchedComponent.fetchData) fetchDataPromises.push(matchedComponent.fetchData({ store, router }));
			});
			Promise.all(fetchDataPromises).then(states => {
				context.state = { store: store.state, fetch: {} }
				states.forEach(state => {
					Object.assign(context.state.fetch, state);
				})
				resolve(app);
			})
			.catch((err) => {
				console.log('-----err-------');
				console.log(err);
			});
		});
	});
}
