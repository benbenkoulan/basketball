const express = require('express')
const path = require('path')
const fs = require('fs')

const isProd = process.env.NODE_ENV === 'production'

const { createBundleRenderer } = require('vue-server-renderer')

const app = express()

let bundleRenderer, readyPromise

const template = fs.readFileSync(path.join(path.resolve('./src'), 'index.template.html'), 'utf-8')

function createRenderer(bundle, options){
	return createBundleRenderer(bundle, Object.assign(options, {
		template,
		runInNewContext: false
	}))
}

if(isProd){
	const serverBundle = require('./dist/vue-ssr-server-bundle.json')
	const clientManifest = require('./dist/vue-ssr-client-manifest.json')
	bundleRenderer = createRenderer(serverBundle, { clientManifest })
} else {
	readyPromise = require('./build/dev-server')(app, (bundle, options) => {
		bundleRenderer = createRenderer(bundle, options)
	})
}


app.use('/assets', express.static(path.resolve('./dist/')))
app.use('/public', express.static(path.resolve('./public/')))

const render = (req, res) => {
	res.setHeader('Content-Type', 'text/html')
	let html = ''
	let context = { url: req.url, title: '哇哦篮球' }
	console.log(req.url);
	let stream = bundleRenderer.renderToStream(context)

	stream.on('data', data => {
		html += data.toString()
	})

	stream.on('end', () => {
		res.end(html)
	})

	stream.on('error', error => {
		console.error('---error-------start--------')
		console.error(error)
		console.error('---error-------end----------')
	})
}


app.get(/[^json]/, isProd ? render : (req, res) => {
	readyPromise
	.then(() => render(req, res))
	.catch(err => {
		console.log(err);
	})
})

app.get(/.json$/, (req, res) => {
	res.type('.json');
	let basePath = isProd ? './dist/' : './src/';
	basePath = path.resolve(basePath);
	let filePath = path.join(basePath, req.path);
	if(fs.existsSync(filePath)){
		var data = fs.readFileSync(filePath);
		res.send(data);	
	} else {
		res.send('not found');
	}
});


app.listen(5000, () => {
	console.log('server started, listening port 5000')
})