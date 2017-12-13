const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const InlineManifestPlugin = require('inline-manifest-webpack-plugin')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = webpackMerge(baseConfig, {
	entry: {
		index: ['./src/entry-client.js'],
		vendor: ['vue']
	},
	plugins: [
		new webpack.DefinePlugin({ 
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': 'client'
		}),
		new CommonsChunkPlugin({
			name: 'vendor',
			miniChunks:  module => {
               return module.context && module.context.indexOf('node_modules') !== -1;	// this assumes your vendor imports exist in the node_modules directory
			}
		}), new CommonsChunkPlugin({
			name: 'manifest'
		}), new InlineManifestPlugin({ 
			name: 'webpackManifest' 
		}),
		new VueSSRClientPlugin()
	]
})