import { createApp } from './app'

export default context => {
	return new Promise((resolve, reject) => {
		const { app, router } = createApp()
		router.push({ path: context.url })
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			Promise.all(matchedComponents.map(matchedComponent => {
				
			})).then(() => {
				resolve(app)
			})
		})
	})
}