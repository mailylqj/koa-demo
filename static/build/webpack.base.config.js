const path = require('path');
const webpack = require('webpack');
// const React =  require('react');
const glob = require('glob');
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
/* var webpack = require('gulp-webpack');
var node_mudules_dir = path.resolve(__dirname, 'node_mudules');*/

const entry = {};
const files = glob.sync('../src/pages/*.js');
files.forEach((file) => {
	const name = file.replace(/(.*\/)*([^.]+).*/ig, '$2');
	// .replace(/(.*\/)*([^.]+).*/ig,"$2");  匹配文件名
	entry[name] = path.resolve(__dirname, file);
});

// console.log(path.resolve(__dirname, 'static/src/pages/*.js'))

module.exports = {
	plugins: [CommonsChunkPlugin],
	entry: {
		index: path.resolve(__dirname, '../src/pages/index.js'),
		login: path.resolve(__dirname, '../src/pages/login.js'),
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, '../dist/pages/'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [path.join(__dirname, '../src/pages'), 'node_modules']
	},
	devServer: {
		contentBase: './dist',
		hot: true,
		historyApiFallback: true
	},
	eslint: {
		configFile: './.eslintrc'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_mudules/,
				loader: 'jsx-loader'
			},
			{
				test: /\.(es6|js|jsx)$/,
				exclude: /node_mudules/,
				loader: 'babel',
				query:
				{// 没加stage-1，无法使用es6的箭头函数
					presets: ['es2015', 'react', 'stage-1']
				}
			}
		]
	}
};
