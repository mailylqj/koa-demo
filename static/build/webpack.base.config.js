const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entrys = {};
const files = glob.sync('static/src/apps/*.js');
files.forEach((file) => {
	// const name = file.replace(/(.*\/)*([^.]+).*/ig, '$2');
	const name = file.replace(/static\/src\/(apps\/[^\*\@\&]+).js/ig, '$1');
	entrys[name] = path.resolve(file);
});

module.exports = {	
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
		rules: [{
			test: /\.(es6|js|jsx)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', {
							targets: {
								'browsers': ['> 5%', 'last 2 versions']
							},
							debug: true,
							useBuiltIns: 'usage'
						}],
						['@babel/preset-react'],
						['@babel/preset-stage-0']
					],
					plugins: [
						['add-module-exports'] // 支持import对象的某个属性
					]
				}
			}
		},{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				use: [ 'css-loader' ]
			})
		},{
			test: /\.(scss|sass)$/,
			use: ExtractTextPlugin.extract({
				use: [ 'css-loader', 'sass-loader' ]
			})
		},{
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: [ 'css-loader', 'less-loader' ]
			})
		}]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({ // CommonsChunkPlugin 必须设置 allChunks
			name: 'vendor/vendor',
			minChunks: 2
		}), 
		new ExtractTextPlugin({
			filename: 'vendor/style.css',
			allChunks: true
		})
	]
};
