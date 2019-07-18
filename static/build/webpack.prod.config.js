const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(baseWebpackConfig, {
	// eval-source-map is faster for development
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			enforce: 'pre',
			loader: 'eslint-loader'
		}]
	},	
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new ParallelUglifyPlugin({
			cacheDir: '.cache/',
			uglifyJS:{
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			}
		})
	]
});
