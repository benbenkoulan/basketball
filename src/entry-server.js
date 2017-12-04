import { createApp } from './app'

var G = {};
global.G = G;

export default context => {
	return new Promise((resolve, reject) => {
		const { app, store, router } = createApp()
		router.push({ path: context.url })
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			Promise.all(matchedComponents.map(matchedComponent => {
				return matchedComponent.fetchData && matchedComponent.fetchData({ store, router });
			})).then(() => {
				context.state = store.state;
				resolve(app)
			})
		})
	})
}