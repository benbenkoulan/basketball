const postcssfor = require('postcss-for')
const cssnext = require('postcss-cssnext')
const postcsscalc = require('postcss-calc')
const postcssimport = require('postcss-import')
const postcssmixins = require('postcss-mixins')
const postcssdefinefunction = require('postcss-define-function')

module.exports = {
	plugins: [
		postcssimport({ path: './src/css' }),
		cssnext,
		postcssfor,
		postcsscalc,
		postcssmixins,
		postcssdefinefunction({ silent: true }),
	]
}