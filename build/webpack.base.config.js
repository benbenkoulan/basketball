const isProd = process.env.NODE_ENV === 'production'
const webpack = require('webpack')

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

const NamedChunksPlugin = webpack.NamedChunksPlugin;
const plugins = [new VueLoaderPlugin()];
const optimization = {};
if (isProd) {
	optimization.minimizer = [
		new uglifyjsWebpackPlugin({
			uglifyOptions: {
				warnings: false,
			    parse: {},
			    compress: {},
			    mangle: true, // Note `mangle.properties` is `false` by default.
			    output: null,
			    toplevel: false,
			    nameCache: null,
			    ie8: false,
			    keep_fnames: false
			},
			cache: true,
			parallel: true,
			sourceMap: true // set to true if you want JS source maps
		}),
		new optimizeCssAssetsWebpackPlugin({})
	];
	optimization.splitChunks = {
		chunks: 'all',
		minSize: 10000,
		maxSize: 0,
		minChunks: 1,
		maxAsyncRequests: 5,
		maxInitialRequests: 3,
		automaticNameDelimiter: '~',
		name: true,
		cacheGroups: {
			vendors: {
				name: 'vendor',
			 	test: /[\\/]node_modules[\\/]/,
			 	priority: -10
			},
			default: {
			  minChunks: 2,
			  priority: -20,
			  reuseExistingChunk: true
			}
		}
	};
}


module.exports = {
	mode: process.env.NODE_ENV,
	output: {
		publicPath: '/assets/',
		path: path.resolve(__dirname, '../dist'),
		filename: isProd ? '[name].[chunkhash].js' : '[name].[hash].js',
		chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].[hash].js'
	},
	module: {
    	rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				extractCSS: isProd,
				preserveWhitespace: false
			}
		},{
			test: /\.(jpe?g|png|svg|gif)$/,
			exclude: /node_modules/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 2000
				}
			}
		},{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		}]
	},
	resolve: {
		alias: {
			img: path.resolve('./src/img'),
			css: path.resolve('./src/css'),
			com: path.resolve('./src/com'),
			api: path.resolve('./src/api'),
			views: path.resolve('./src/views'),
			utils: path.resolve('./src/utils'),
			//vue$: path.resolve('./lib/vue.runtime.esm.js'),
			modules: path.resolve('./src/modules')
		},
		extensions: ['.js', '.css', '.vue']
	},
	devtool: isProd ? false : '#cheap-module-source-map',
	plugins,
	optimization
}