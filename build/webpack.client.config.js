const isProd = false; // process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const path = require('path')

// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const InlineManifestPlugin = require('inline-manifest-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const miniCSSExtractPlugin = require('mini-css-extract-plugin')

const plugins = [];
plugins.push(new webpack.DefinePlugin({ 
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
	'process.env.VUE_ENV': 'client'
}));
plugins.push(new VueSSRClientPlugin());

if (isProd) {
	plugins.push(
		new miniCSSExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	);
}


const clientConfig = webpackMerge(baseConfig, {
	entry: {
		main: [path.resolve('./src/', 'entry-client.js')],
		vendor: ['vue']
	},
	plugins,
	module: {
		rules: [{
			test: /\.css$/,
			exclude: /node_modules/,
			use: [ isProd ? { loader: miniCSSExtractPlugin.loader } : 'vue-style-loader', 'css-loader', 'postcss-loader' ]
		}]
	},
	optimization: { runtimeChunk: { name: 'runtime' } }
});

// console.log(clientConfig);

module.exports = clientConfig;