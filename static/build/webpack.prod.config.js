const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

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
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		})
	]
});
