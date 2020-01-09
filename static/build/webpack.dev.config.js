const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

module.exports = merge(baseWebpackConfig, {
	devtool: 'source-map',
	mode: 'development',
	plugins: [
		new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        })
	]
});
