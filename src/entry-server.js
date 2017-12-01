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

			})).then(() => {
				context.state = { test: 1 }
				resolve(app)
			})
		})
	})
}