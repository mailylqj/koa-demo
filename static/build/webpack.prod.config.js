const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
	// eval-source-map is faster for development
	mode: 'production',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			enforce: 'pre',
			loader: 'eslint-loader'
		}]
	},	
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		})
	]
});
