const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common/common');
/* var webpack = require('gulp-webpack');
var node_mudules_dir = path.resolve(__dirname, 'node_mudules');*/

const entrys = {};
const files = glob.sync('static/src/apps/*.js');
files.forEach((file) => {
	// const name = file.replace(/(.*\/)*([^.]+).*/ig, '$2');
	const name = file.replace(/static\/src\/(apps\/[^\*\@\&]+).js/ig, '$1');
	entrys[name] = path.resolve(file);
});
entrys['common/vendor'] = ['react', 'react-dom'];

module.exports = {
	plugins: [CommonsChunkPlugin, new ExtractTextPlugin('common/style.css')],
	entry: entrys,
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js',
		chunkFilename: 'components/[name].[chunkhash:5].chunk.js',
		publicPath: '/dist/'
	},
	resolve: {
		extensions: ['.js', '.jsx', 'json'],
		modules: [path.join(__dirname, '../src/'), 'node_modules'],
		alias: {
			'&': path.join(__dirname, '../stable'),
			'@': path.join(__dirname, '../src')
		}
	},
	devServer: { // 快速开发环境
		contentBase: path.join(__dirname, '../'),
		port: 3000,
		hot: true,
		inline: true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'eslint-loader'
			},
			{
				test: /\.(es6|js|jsx)$/,
				exclude: /node_mudules/,
				loader: 'babel-loader',
				query: {// 没加stage-1，无法使用es6的箭头函数
					presets: ['es2015', 'react', 'stage-1'],
					plugins: ['add-module-exports']
				}
			},
			{
				test: /\.css$/,
				exclude: /node_mudules/,
				loader: ExtractTextPlugin.extract({
					use: 'css-loader'
				})
			},
			{
				test: /\.(scss|sass)$/,
				loader: ExtractTextPlugin.extract({
					use: 'style-loader!css-loader!sass-loader'
				})
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					use: 'style-loader!css-loader!less-loader'
				})
			}
		]
	}
};
