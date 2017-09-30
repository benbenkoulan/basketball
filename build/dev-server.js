const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')
const MFS = require('memory-fs')
const path = require('path')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')


module.exports = (app, callback) =>{
	let clientManifest, serverBundle, resolve

	const readyPromise = new Promise(r => resolve = r)
	const ready = (...args) => {
		resolve()
		callback(...args)
	}

	clientConfig.entry.index.push('webpack-hot-middleware/client')
	clientConfig.entry.vendor.push('webpack-hot-middleware/client')
	clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

	const clientCompiler = webpack(clientConfig)
	const devMidllWare = webpackDevMiddleWare(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		noInfo: true,
		stats: {
			color: true
		}
	})

	clientCompiler.plugin('done', () => {
		const fs = devMidllWare.fileSystem
		const readFile = file => fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
		clientManifest = JSON.parse(readFile('vue-ssr-client-manifest.json'))
		if(serverBundle){
			ready(serverBundle, {
				clientManifest
			})
		}
	})

	app.use(devMidllWare)
	app.use(webpackHotMiddleWare(clientCompiler))

	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs

	serverCompiler.watch({}, (err, stats) => {
		if(err) throw err
		stats = stats.toJson()
	    stats.errors.forEach(err => console.error(err))
	    stats.warnings.forEach(err => console.warn(err))
		const readFile = file => mfs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
		serverBundle = JSON.parse(readFile('vue-ssr-server-bundle.json'))
		if(clientManifest){
			ready(serverBundle, {
				clientManifest
			})
		}
	})

	return readyPromise
}