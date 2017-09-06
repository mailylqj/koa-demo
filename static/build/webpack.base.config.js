const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common/common');
/* var webpack = require('gulp-webpack');
var node_mudules_dir = path.resolve(__dirname, 'node_mudules');*/

const entrys = {};
const files = glob.sync('static/src/pages/*.js');
files.forEach((file) => {
	// const name = file.replace(/(.*\/)*([^.]+).*/ig, '$2');
	const name = file.replace(/static\/src\/(pages\/[^\*\@\&]+).js/ig, '$1');
	entrys[name] = path.resolve(file);
});
entrys['common/vendor'] = ['react', 'react-dom'];

module.exports = {
	plugins: [CommonsChunkPlugin],
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
	devServer: {
		contentBase: './dist',
		hot: true,
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
			}
		]
	}
};
