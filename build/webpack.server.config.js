const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(baseConfig, {
	target: 'node',
	entry: './src/entry-server.js',
	devtool: 'source-map',
	output: {
		libraryTarget: 'commonjs2'
	},
	plugins: [new VueSSRServerPlugin()]
})